import { useEffect, useRef } from 'react';
import type { LunaticComponentProps } from '../type';
import { OrchestratedComponent } from '../commons';
import { collecteValue } from '../table/cell';

/**
 * A durcir. comment refetch si le réseau est incertain...
 */
const fetchFromServer = (
	remote: string,
	values: unknown
): Promise<Record<string, unknown>> => {
	return fetch(remote, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	}).then((response) => response.json());
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
