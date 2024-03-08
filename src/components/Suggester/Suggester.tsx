import { type ReactNode, useEffect, useMemo } from 'react';
import type { LunaticComponentProps } from '../type';
import { CustomSuggester } from './CustomSuggester';
import { createSearching } from './helpers';
import { SuggesterStatus } from './SuggesterStatus';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { useSuggesterInfo } from '../../hooks/useSuggesterInfo';

export function Suggester({
	storeName,
	idbVersion = '1',
	id,
	className,
	optionRenderer,
	labelRenderer,
	handleChange,
	disabled,
	value,
	label,
	description,
	getSuggesterStatus,
	errors,
	readOnly,
	workersBasePath,
	response,
	optionResponses = [],
	executeExpression,
	iteration,
}: LunaticComponentProps<'Suggester'>) {
	const { state, fetchInfos, infos } = useSuggesterInfo(storeName, idbVersion);
	const onChange = (
		v: string | null | { id?: string; [key: string]: ReactNode }
	) => {
		if (v && typeof v === 'object' && optionResponses) {
			if (v.id) {
				handleChange(response, v.id);
			}
			for (const optionResponse of optionResponses) {
				if (optionResponse.attribute in v) {
					handleChange(
						{ name: optionResponse.name },
						v[optionResponse.attribute] as string | null
					);
				}
			}
		} else {
			handleChange(response, v as string | null);
		}
	};

	// Fetch suggester info when the suggester is mounted
	useEffect(() => {
		fetchInfos();
	}, [fetchInfos]);

	const searching = useMemo(
		function () {
			if (infos) {
				return createSearching(storeName, idbVersion, workersBasePath);
			}
			return undefined;
		},
		[infos, storeName, idbVersion, workersBasePath]
	);

	// Default options should not change between render
	// so we can break the rule of hooks here
	const defaultOptions = useMemo(() => {
		if (!value) {
			return [];
		}
		const labelResponse = optionResponses?.find((o) => o.attribute === 'label');
		if (!labelResponse) {
			return [];
		}
		const label = executeExpression<ReactNode>(labelResponse.name, {
			iteration,
		});
		if (!label) {
			return [];
		}
		return [
			{
				id: value,
				label: label,
				value: value,
			},
		];
	}, []);

	return (
		<SuggesterStatus
			storeName={storeName}
			getSuggesterStatus={getSuggesterStatus}
			label={label}
			description={description}
		>
			{state === 'Loading' && (
				<div className="lunatic-suggester-in-progress">
					Le store {storeName} est en cours de chargement.
				</div>
			)}
			{state === 'Error' && (
				<div className="lunatic-suggester-unvailable">
					La suggestion sur liste n'est pas possible sur votre navigateur, vous
					pouvez passer la question en appuyant sur Enregistrer et Continuer
				</div>
			)}
			{state === 'Ready' && searching && (
				<CustomSuggester
					id={id}
					className={className}
					optionRenderer={optionRenderer}
					labelRenderer={labelRenderer}
					defaultOptions={defaultOptions}
					onSelect={onChange}
					searching={searching}
					disabled={disabled}
					readOnly={readOnly}
					value={value}
					label={label}
					description={description}
					errors={getComponentErrors(errors, id)}
				/>
			)}
		</SuggesterStatus>
	);
}
