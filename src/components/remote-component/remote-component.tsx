import { useEffect, useRef } from 'react';
import type { LunaticComponentProps } from '../type';
import { OrchestratedComponent } from '../commons';
import { collecteValue } from '../table/cell';

const LATENCY = 2000;

/**
 * logique d'appel au service (sans auth)
 *
 */
const fetchFromServer = (
	remote: string,
	values: unknown,
	retry = [true, true, true, false] // on retente 3 fois à une LATENCY mms d'interval
): Promise<Record<string, unknown>> => {
	return new Promise((resolve) => {
		fetch(remote, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					resolve({ RESPONSE: false });
				}
			})
			.then((r) => {
				resolve(r);
			})
			.catch(() => {
				const [is, ...rest] = retry;
				if (is) {
					window.setTimeout(() => {
						resolve(fetchFromServer(remote, values, rest));
					}, LATENCY);
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
	} = props;

	const loading = useRef(false);
	const fetched = useRef(false);

	useEffect(() => {
		if (remote && !loading.current && !fetched.current) {
			loading.current = true;
			fetchFromServer(remote, value).then(
				(response: Record<string, unknown>) => {
					fetched.current = true;
					if (response) {
						Object.entries(response).forEach(([name, value]) => {
							handleChange({ name }, value as string); // il y a probablement mieux à faire
						});
					}
				}
			);
		}
	}, [remote, value, handleChange]);

	/**
	 * // TODO Gérer les component Set
	 */
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

	return <div>waiting</div>;
}
