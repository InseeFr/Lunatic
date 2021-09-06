import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../constants';
import IDBSuggester from './idb-suggester';
import LabelWrapper from '../../utils/components/label-wrapper';
import FieldWrapper from '../../utils/components/field-wrapper';

function Suggester({
	id,
	label,
	preferences,
	response,
	handleChange,
	disabled,
	focused,
	declarations,
	features,
	bindings,
	management,
	labelPosition,
	style,
	logFunction,
	storeName,
	optionRenderer,
	labelRenderer,
	max,
	idbVersion,
}) {
	const [value, setValue] = useState(() =>
		U.getResponseByPreference(preferences)(response)
	);

	const labelId = `suggester-label-${id}`;

	const onSelect = useCallback(
		function (suggestion) {
			if (suggestion === null) {
				setValue(null);
				handleChange({
					[U.getResponseName(response)]: null,
				});
			} else {
				const { id } = suggestion;
				setValue(id);
				handleChange({
					[U.getResponseName(response)]: id,
				});
			}
		},
		[handleChange, response]
	);

	// Assume we only want to handle enable external updates
	// Don't need to check all value changes
	useEffect(() => {
		if (U.getResponseByPreference(preferences)(response) !== value)
			setValue(U.getResponseByPreference(preferences)(response));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response, preferences]);

	return (
		<>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<LabelWrapper
				id={labelId}
				htmlFor={id}
				labelPosition={labelPosition}
				bindings={bindings}
				label={label}
				features={features}
				logFunction={logFunction}
			>
				<Declarations
					id={id}
					type={C.AFTER_QUESTION_TEXT}
					declarations={declarations}
					features={features}
					bindings={bindings}
				/>
				<FieldWrapper id={id} management={management} response={response}>
					<IDBSuggester
						storeName={storeName}
						optionRenderer={optionRenderer}
						labelRenderer={labelRenderer}
						max={max}
						labelledBy={labelId}
						idbVersion={idbVersion}
						onSelect={onSelect}
						focused={focused}
						disabled={disabled}
						response={response}
						id={id}
					/>
				</FieldWrapper>
			</LabelWrapper>
			<Declarations
				id={id}
				type={C.DETACHABLE}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
		</>
	);
}

Suggester.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	disabled: false,
	focused: false,
	declarations: [],
	features: [],
	bindings: {},
	management: false,
	labelPosition: 'DEFAULT',
	style: {},
	getStoreInfo: undefined,
};

Suggester.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	handleChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	management: PropTypes.bool,
	path: PropTypes.string.isRequired,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	style: PropTypes.object,
	storeInfo: PropTypes.object, //TODO
	getStoreInfo: PropTypes.func,
};

export default React.memo(Suggester, U.areEqual);
