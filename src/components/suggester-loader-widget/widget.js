import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LoaderRow from './loader-row';
import { Tools, ActionTool } from './tools';
import { IsNetwork } from '../../utils/components/is-network';
import Dragger from '../../utils/components/dragger';
import OnDragIcon from '../../utils/icons/on-drag.icon';
import './widget.scss';

function empty() {}

function SuggesterLoaderWidget({ source, getStoreInfo, onRefresh, absolute }) {
	const { suggesters } = source;
	const containerEl = useRef();
	const { current } = containerEl;
	const [stores, setStores] = useState(undefined);
	const [rows, setRows] = useState([]);
	const [disabled, setDisabled] = useState(false);
	const [drag, setDrag] = useState(false);

	useEffect(
		function () {
			if (suggesters) {
				const str = Object.entries(suggesters).reduce(function (
					a,
					[name, storeInfo]
				) {
					return { ...a, [name]: { storeInfo, ...getStoreInfo(name) } };
				},
				{});

				setStores(str);
			}
		},
		[suggesters, getStoreInfo]
	);

	const notify = useCallback(function (online) {
		setDisabled(!online);
	}, []);

	const onDrag = useCallback(
		function (status) {
			if (!drag && status) {
				setDrag(true);
			} else if (drag && !status) {
				setDrag(false);
			}
		},
		[drag]
	);

	useEffect(
		function () {
			if (stores) {
				setRows(
					Object.entries(stores).map(function ([
						name,
						{ storeInfo, idbVersion, fetch: fetchStore },
					]) {
						return (
							<LoaderRow
								key={name}
								storeInfo={storeInfo}
								idbVersion={idbVersion}
								fetchStore={fetchStore}
								onRefresh={onRefresh}
								disabled={disabled}
							/>
						);
					})
				);
			}
		},
		[stores, disabled, onRefresh]
	);

	return (
		<div
			className={classnames('lunatic-suggester-widget-container', {
				absolute,
			})}
			ref={containerEl}
		>
			<div className={classnames('lunatic-suggester-widget', { drag })}>
				<Tools>
					<ActionTool
						className={classnames('', { drag })}
						ariaLabel="drag"
						display={absolute}
						title="drag"
					>
						<Dragger el={current} onDrag={onDrag}>
							<OnDragIcon className={classnames('on-drag-icon', { drag })} />
						</Dragger>
					</ActionTool>
				</Tools>
				<IsNetwork
					className={classnames('suggester-widget-network', { drag })}
					notify={notify}
				/>
				{rows}
			</div>
		</div>
	);
}

SuggesterLoaderWidget.propTypes = {
	absolute: PropTypes.bool,
	source: PropTypes.object.isRequired,
	getStoreInfo: PropTypes.func.isRequired,
	onRefresh: PropTypes.func,
};

SuggesterLoaderWidget.defaultProps = {
	onRefresh: empty,
	absolute: false,
};

export default SuggesterLoaderWidget;
