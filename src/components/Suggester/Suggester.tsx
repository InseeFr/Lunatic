import { useEffect, useMemo } from 'react';
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
}: LunaticComponentProps<'Suggester'>) {
	const { state, fetchInfos, infos } = useSuggesterInfo(storeName, idbVersion);
	const onChange = (v: string | null) => {
		handleChange(response, v);
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
