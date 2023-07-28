import { useCallback } from 'react';
import { useOnHandleChange } from '../commons';
import { ComboBoxOption } from '../commons/components/combo-box/combo-box.type';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
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
	// @ts-ignore
	const onChangeSimple = useOnHandleChange({ handleChange, response, value });
	console.log('disabled', disabled);
	const onChange = useCallback(
		(option: ComboBoxOption) => {
			if (responses) {
				responses.forEach((r) => {
					// @ts-ignore
					if (value[r.id] != option[r.id]) {
						// @ts-ignore
						handleChange(r.response, option[r.id]);
					}
				});
			} else {
				// @ts-ignore
				onChangeSimple(option?.id);
			}
		},
		[handleChange, onChangeSimple, responses, value]
	);

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
				// @ts-ignore
				onSelect={onChange}
				responses={responses}
				response={response}
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
