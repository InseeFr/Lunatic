import { useEffect, useRef } from 'react';
import type { LunaticComponentProps } from '../type';
import { OrchestratedComponent } from '../commons';
import { collecteValue } from '../table/cell';

const LATENCY = 2000;
const RETRY = 3;

/**
 * logique d'appel au service (sans auth)
 *
 */
const fetchFromServer = (
	remote: string,

	retry = RETRY,
	latency = LATENCY
): Promise<Record<string, unknown>> => {
	return new Promise((resolve) => {
		fetch(remote, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					resolve({ RESPONSE: false });
				}
			})
			.then((r) => {
				resolve(r);
			})
			.catch(() => {
				if (retry > 0) {
					window.setTimeout(() => {
						resolve(fetchFromServer(remote, retry - 1, latency));
					}, latency);
				} else {
					resolve({ RESPONSE: false });
				}
			});
	});
};

/**
 *
 *
 * @param props
 * @returns
 */
export function RemoteComponent(
	props: LunaticComponentProps<'RemoteComponent'>
) {
	const {
		value,
		components,
		remote,
		handleChange,
		executeExpression,
		iteration,
		retry = RETRY,
		latency = LATENCY,
		pendingMessage = 'En attente...',
	} = props;

	const loading = useRef(false);
	const fetched = useRef(false);

	useEffect(() => {
		if (remote && !loading.current && !fetched.current) {
			loading.current = true;
			fetchFromServer(remote, retry, latency).then(
				(response: Record<string, unknown>) => {
					fetched.current = true;
					if (response) {
						Object.entries(response).forEach(([name, value]) => {
							handleChange({ name }, value as string);
						});
					}
				}
			);
		}
	}, [remote, handleChange, retry, latency]);

	if (fetched.current) {
		if (components && components.length) {
			return components.map((c, i) => {
				return (
					<OrchestratedComponent
						component={c}
						executeExpression={executeExpression}
						iteration={iteration}
						value={collecteValue(c, value)}
						handleChange={handleChange}
						key={i}
					/>
				);
			});
		}
		return <>Nothing to display!</>;
	}

	return <>{pendingMessage}</>;
}
