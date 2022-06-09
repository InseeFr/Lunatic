import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LoaderRow from './loader-row';
import { Tools, ActionTool } from './tools';
import { IsNetwork } from '../commons/components/is-network';
import WidgetContainer from './widget-container';
import Dragger from '../commons/components/dragger';
import { OnDragIcon } from 'components/commons/icons';
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
				const str = suggesters.reduce(function (current, storeInfo) {
					const { name } = storeInfo;

					return { ...current, [name]: { storeInfo, ...getStoreInfo(name) } };
				}, {});

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

	useEffect(
		function () {
			if (current && absolute) {
				current.style.top = '30px';
				current.style.left = '30px';
			}
		},
		[current, absolute]
	);

	return (
		<WidgetContainer ref={containerEl} drag={drag} absolute={absolute}>
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
		</WidgetContainer>
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
