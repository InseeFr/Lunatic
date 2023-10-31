import { useCallback, useEffect, useRef, useState } from 'react';
import { initStore } from '../utils/store-tools/initStore';
import { createAppendTask } from '../utils/suggester-workers/append-to-index/create-append-task';
import type { SuggesterType } from './type-source';

type useSuggestersType = {
	auto: boolean;
	getReferentiel?: (name: string) => Promise<Array<unknown>>;
	suggesters?: Array<SuggesterType>;
	workersBasePath?: string;
};

export enum SuggesterStatus {
	unused = 0,
	idle = 1,
	pending = 2,
	success = 3,
	unknown = 4,
	error = 5,
}

function nothing() {}

// with side effect !
function setStatus(
	status: React.MutableRefObject<Record<string, SuggesterStatus> | undefined>,
	name: string,
	state: SuggesterStatus
) {
	if (status && status.current) {
		const { current } = status;
		if (name in current) current[name] = state;
	}
}

export function useSuggesters({
	auto,
	getReferentiel,
	suggesters,
	workersBasePath,
}: useSuggestersType) {
	const status = useRef<Record<string, SuggesterStatus>>();

	const [timestamp, setTimestamp] = useState<number>(Date.now());

	const getSuggesterStatus = useCallback(
		function (name: string) {
			const { current } = status;
			if (!auto) {
				return { status: SuggesterStatus.unused, timestamp };
			}
			if (current && name in current) {
				return { status: current[name], timestamp };
			}
			return { status: SuggesterStatus.unknown, timestamp };
		},
		[status, timestamp, auto]
	);

	useEffect(
		function () {
			if (suggesters) {
				status.current = suggesters.reduce(
					(a, { name }) => ({ ...a, [name]: SuggesterStatus.idle }),
					{}
				);
			}
		},
		[suggesters, status]
	);

	useEffect(
		function () {
			const aborts: Array<() => void> = [];
			if (
				typeof getReferentiel === 'function' &&
				Array.isArray(suggesters) &&
				auto
			) {
				suggesters.forEach(function (store) {
					const { name } = store;
					const { current } = status;

					(async function () {
						if (current) {
							try {
								if (current[name] === SuggesterStatus.idle) {
									const isClean = await initStore(store);
									if (!isClean) {
										setStatus(status, name, SuggesterStatus.error);
										setTimestamp(Date.now());
									} else {
										setStatus(status, name, SuggesterStatus.pending);
										setTimestamp(Date.now());
									}
								}
								if (current[name] === SuggesterStatus.pending) {
									const data = await getReferentiel(name);
									const [append, abort] = createAppendTask<any>(
										store,
										1,
										nothing,
										workersBasePath
									);
									aborts.push(abort);
									const result = await append(data);
									if (result) {
										setStatus(status, name, SuggesterStatus.success);
										setTimestamp(Date.now());
									} else {
										setStatus(status, name, SuggesterStatus.error);
										setTimestamp(Date.now());
									}
								}
							} catch (e: any) {
								console.error(e);
								setStatus(status, name, SuggesterStatus.error);
								setTimestamp(Date.now());
							}
						}
					})();
				});
				return () => {
					aborts.forEach(function (a) {
						a();
					});
				};
			}
		},
		[suggesters, auto, getReferentiel, status, workersBasePath]
	);

	return getSuggesterStatus;
}
