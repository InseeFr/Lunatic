import { IDBSuggester } from './idb-suggester';
import useOnHandleChange from '../commons/use-on-handle-change';
import { LunaticComponentProps } from '../type';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const WrappedSuggester = wrapWithDeclarations(IDBSuggester);

function LunaticSuggester({
	id,
	storeName,
	optionRenderer,
	labelRenderer,
	idbVersion,
	value,
	handleChange,
	disabled,
	errors,
	label,
	description,
	declarations,
	missingResponse,
	response,
	getSuggesterStatus,
}: LunaticComponentProps<'Suggester'>) {
	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<WrappedSuggester
			declarations={declarations}
			missingResponse={missingResponse}
			description={description}
			handleChange={handleChange}
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
	);
}

export default LunaticSuggester;
