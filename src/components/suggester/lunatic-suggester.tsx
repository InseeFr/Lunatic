import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import { LunaticComponentProps } from '../type';
import { IDBSuggester } from './idb-suggester';

function LunaticSuggester({
	id,
	storeName,
	optionRenderer,
	labelRenderer,
	idbVersion,
	focused,
	value,
	handleChange,
	disabled,
	errors,
	label,
	description,
	preferences,
	declarations,
	missing,
	missingResponse,
	management,
	response,
	responses,
	displayResponses,
	getSuggesterStatus,
}: LunaticComponentProps<'Suggester'>) {
	// ToDo :
	/**
	 * response -> responses
	 * onChange(id) -> onChange({ code: '', label: '', info: '' }) -> onSelect in subComponent
	 * useOnHandleChange -> update to handleChange on 3 response REPONSENAME (historical value i.e the code), REPONSENAME_LABEL, REPONSENAME_INFO
	 */
	const onChange = useOnHandleChange({
		handleChange,
		response,
		value,
	});
	const onChange2 = (
		responses: Array<{ id: string; response: { name: string } }>
	) => {
		if (responses) {
			responses?.forEach((r) => {
				console.log('r', r);
				useOnHandleChange(handleChange, r.response, r.id);
			});
		} else {
			useOnHandleChange(handleChange, response, value);
		}
	};
	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<IDBSuggester
				storeName={storeName}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				idbVersion={idbVersion}
				onSelect={onChange}
				disabled={disabled}
				id={id}
				value={value}
				errors={errors}
				label={label}
				displayResponses={displayResponses}
				getSuggesterStatus={getSuggesterStatus}
			/>
		</LunaticComponent>
	);
}

export default LunaticSuggester;
