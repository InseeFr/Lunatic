import { IDBSuggester } from './idb-suggester';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../commons/components/errors/errors';

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
	readOnly,
	errors,
	label,
	description,
	preferences,
	declarations,
	missing,
	missingResponse,
	management,
	response,
	className,
	getSuggesterStatus,
}: LunaticComponentProps<'Suggester'>) {
	const onChange = useOnHandleChange({ handleChange, response, value });
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
				errors={getComponentErrors(errors, id)}
				label={label}
				getSuggesterStatus={getSuggesterStatus}
				className={className}
				readOnly={readOnly}
			/>
		</LunaticComponent>
	);
}

export default LunaticSuggester;
