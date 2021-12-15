import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import componentWrapper from '../component-wrapper';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../constants';
import IDBSuggester from './idb-suggester';
import LabelWrapper from '../../utils/components/label-wrapper';
import FieldWrapper from '../../utils/components/field-wrapper';

// function getSuggestionId(suggestion) {
// 	if (suggestion) {
// 		return suggestion.id;
// 	}
// 	return null;
// }

// function Suggester({
// 	id,
// 	label,
// 	preferences,
// 	response,
// 	handleChange,
// 	disabled,
// 	focused,
// 	declarations,
// 	features,
// 	bindings,
// 	management,
// 	labelPosition,
// 	style,
// 	logFunction,
// 	storeName,
// 	optionRenderer,
// 	labelRenderer,
// 	idbVersion,
// }) {
// 	const [value, setValue] = useState(() =>
// 		U.getResponseByPreference(preferences)(response)
// 	);
// 	const labelId = `suggester-label-${id}`;
// 	const onSelect = useCallback(
// 		function (suggestion) {
// 			const ids = getSuggestionId(suggestion);
// 			// Delete: null --> empty to handle controls
// 			handleChange({
// 				[U.getResponseName(response)]: ids || '',
// 			});
// 			setValue(ids);
// 		},
// 		[handleChange, response]
// 	);

// 	return (
// 		<>
// 			<Declarations
// 				id={id}
// 				type={C.BEFORE_QUESTION_TEXT}
// 				declarations={declarations}
// 				features={features}
// 				bindings={bindings}
// 			/>
// 			<LabelWrapper
// 				id={labelId}
// 				htmlFor={id}
// 				labelPosition={labelPosition}
// 				bindings={bindings}
// 				label={label}
// 				features={features}
// 				logFunction={logFunction}
// 			>
// 				<Declarations
// 					id={id}
// 					type={C.AFTER_QUESTION_TEXT}
// 					declarations={declarations}
// 					features={features}
// 					bindings={bindings}
// 				/>
// 				<FieldWrapper id={id} management={management} response={response}>
// 					<IDBSuggester
// 						storeName={storeName}
// 						optionRenderer={optionRenderer}
// 						labelRenderer={labelRenderer}
// 						labelledBy={labelId}
// 						idbVersion={idbVersion}
// 						onSelect={onSelect}
// 						focused={focused}
// 						disabled={disabled}
// 						response={response}
// 						id={id}
// 						value={value}
// 					/>
// 				</FieldWrapper>
// 			</LabelWrapper>
// 			<Declarations
// 				id={id}
// 				type={C.DETACHABLE}
// 				declarations={declarations}
// 				features={features}
// 				bindings={bindings}
// 			/>
// 		</>
// 	);
// }

// Suggester.defaultProps = {
// 	label: '',
// 	preferences: ['COLLECTED'],
// 	response: {},
// 	disabled: false,
// 	focused: false,
// 	declarations: [],
// 	features: [],
// 	bindings: {},
// 	management: false,
// 	labelPosition: 'DEFAULT',
// 	style: {},
// 	getStoreInfo: undefined,
// };

// Suggester.propTypes = {
// 	id: PropTypes.string.isRequired,
// 	label: PropTypes.string,
// 	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
// 	response: U.responsePropTypes,
// 	handleChange: PropTypes.func.isRequired,
// 	disabled: PropTypes.bool,
// 	focused: PropTypes.bool,
// 	declarations: U.declarationsPropTypes,
// 	features: PropTypes.arrayOf(PropTypes.string),
// 	bindings: PropTypes.object,
// 	management: PropTypes.bool,
// 	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
// 	style: PropTypes.object,
// 	storeInfo: PropTypes.object, //TODO
// 	getStoreInfo: PropTypes.func,
// };

// export default componentWrapper(React.memo(Suggester, U.areEqual));

function Suggester({ storeName }) {
	return <div>Suggester {storeName}</div>;
}

export default Suggester;
