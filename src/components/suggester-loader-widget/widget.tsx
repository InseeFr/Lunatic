import React, {
	useEffect,
	useState,
	useCallback,
	useRef,
	ReactNode,
} from 'react';
import classnames from 'classnames';
import LoaderRow from './loader-row';
import { Tools, ActionTool } from './tools';
import { IsNetwork } from '../commons/components/is-network';
import WidgetContainer from './widget-container';
import Dragger from '../commons/components/dragger';
import { OnDragIcon } from '../commons/icons';
import './widget.scss';
import { voidFunction } from '../../utils/function';
import { SuggesterType } from '../../use-lunatic/type-source';

type Props = {
	absolute?: boolean;
	source: { suggesters: Array<SuggesterType> };
	onRefresh: () => void;
	getStoreInfo: (s: string) => {
		idbVersion: number;
		fetch: () => Promise<unknown[]>;
	};
};

type StoreState = { storeInfo: SuggesterType } & ReturnType<
	Props['getStoreInfo']
>;

function SuggesterLoaderWidget({
	source,
	getStoreInfo,
	onRefresh = voidFunction,
	absolute,
}: Props) {
	const { suggesters } = source;
	const containerEl = useRef<HTMLDivElement>(null);
	const { current } = containerEl;
	const [stores, setStores] = useState<Record<string, StoreState>>();
	const [rows, setRows] = useState([] as ReactNode[]);
	const [disabled, setDisabled] = useState(false);
	const [drag, setDrag] = useState(false);

	useEffect(
		function () {
			if (suggesters) {
				const str = suggesters.reduce(function (current, storeInfo) {
					const { name } = storeInfo;

					return { ...current, [name]: { storeInfo, ...getStoreInfo(name) } };
				}, {} as typeof stores);

				setStores(str);
			}
		},
		[suggesters, getStoreInfo]
	);

	const notify = useCallback(function (online: boolean) {
		setDisabled(!online);
	}, []);

	const onDrag = useCallback(
		function (status: unknown) {
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
					{current && (
						<Dragger el={current} onDrag={onDrag}>
							<OnDragIcon className={classnames('on-drag-icon', { drag })} />
						</Dragger>
					)}
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

export default SuggesterLoaderWidget;
