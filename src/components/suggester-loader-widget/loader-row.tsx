import classnames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import type { SuggesterType } from '../../use-lunatic/type-source';
import { Logger } from '../../utils/logger';
import {
	clearStoreData,
	getStoreCount,
	useStoreIndex,
} from '../../utils/store-tools';
import { CrossIcon, LoadIcon } from '../commons/icons';
import Loader from './loader';

type Props = {
	storeInfo: SuggesterType;
	workersBasePath?: string;
	idbVersion: number;
	fetchStore: () => Promise<unknown[]>;
	disabled?: boolean;
	onRefresh: (s: string) => void;
};

function LoaderRow({
	storeInfo,
	workersBasePath,
	idbVersion,
	fetchStore,
	onRefresh,
	disabled = false,
}: Props) {
	const { name } = storeInfo;
	const db = useStoreIndex(storeInfo, idbVersion);
	const [nbEntities, setNbEntities] = useState<number>();
	const [start, setStart] = useState(false);

	const post = useCallback(
		function (_: unknown, count: number) {
			setNbEntities(count);
			onRefresh(`Store ${name} loaded.`);
		},
		[onRefresh, name]
	);
	const clear = useCallback(
		function () {
			if (db) {
				clearStoreData(db).catch(Logger.error);
				setNbEntities(0);
			}
		},
		[db]
	);

	useEffect(
		function () {
			if (db) {
				getStoreCount(db).then(setNbEntities);
			}
		},
		[db]
	);

	const handleClick = useCallback(function (p: number) {
		if (p === 100) {
			setStart(false);
		}
	}, []);

	return (
		<div className="widget-row">
			<div className="store-name">{name}</div>
			{start ? (
				<Loader
					start={true}
					db={db}
					store={storeInfo}
					idbVersion={idbVersion}
					workersBasePath={workersBasePath}
					fetch={fetchStore}
					post={post}
					handleClick={handleClick}
				/>
			) : (
				<>
					<div className="stats">
						{nbEntities ? `${nbEntities} entities.` : 'Empty store.'}
					</div>

					<button
						className={classnames('widget-button', { disabled })}
						disabled={disabled}
						onClick={() => setStart(true)}
						title="Load"
					>
						<LoadIcon className="lunatic-suggester-icon" />
					</button>
					<button
						className={classnames('widget-button', { disabled })}
						disabled={disabled}
						onClick={clear}
						title="Clear"
					>
						<CrossIcon className="lunatic-suggester-icon" />
					</button>
				</>
			)}
		</div>
	);
}

export default LoaderRow;
