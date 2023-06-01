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
		responses,
		value,
	});
	console.log('value', value);
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
				getSuggesterStatus={getSuggesterStatus}
			/>
		</LunaticComponent>
	);
}

export default LunaticSuggester;
