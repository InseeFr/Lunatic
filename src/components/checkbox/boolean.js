import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import missingWrapper from '../missing-wrapper';
import debounce from 'lodash.debounce';
import Declarations from '../declarations';
import Icon from '../icon';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../constants';
import { interpret } from '../../utils/to-expose';
import './checkbox.scss';

const CheckboxBoolean = ({
	id,
	label,
	preferences,
	response,
	handleChange: propsHandleChange,
	disabled,
	positioning,
	focused,
	declarations,
	features,
	bindings,
	management,
	style,
	logFunction,
}) => {
	const inputRef = useRef();

	const [value, setValue] = useState(() =>
		U.getResponseByPreference(preferences)(response)
	);

	const handleChange = debounce((obj) => propsHandleChange(obj), 50);

	const specificHandleChange = (e) => {
		const [key, value] = Object.entries(e)[0];
		if (value === false && U.responseToClean(response)(preferences))
			handleChange({ [key]: null });
		else handleChange(e);
	};

	// Assume we only want to handle enable external updates
	// Don't need to check all value changes
	useEffect(() => {
		if (U.getResponseByPreference(preferences)(response) !== value)
			setValue(U.getResponseByPreference(preferences)(response));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response, preferences]);

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	const interpretedLabel = interpret(features, logFunction)(bindings)(label);

	const isVertical = positioning === 'VERTICAL';
	const isHorizontal = positioning === 'HORIZONTAL';
	const input = (
		<>
			<Icon type="checkbox" checked={value} disabled={disabled}>
				<input
					type="checkbox"
					id={`checkbox-boolean-${id}`}
					ref={inputRef}
					title={interpretedLabel ? interpretedLabel : 'empty-label'}
					className={`checkbox-boolean-lunatic`}
					style={U.buildStyleObject(style)}
					checked={value || false}
					disabled={disabled}
					onChange={({ target: { checked } }) => {
						setValue(checked);
						specificHandleChange({
							[U.getResponseName(response)]: checked,
						});
						if (U.isFunction(logFunction))
							logFunction(
								U.createObjectEvent(
									`checkbox-boolean-${id}`,
									C.INPUT_CATEGORY,
									C.EVENT_SELECTION,
									U.getResponseName(response),
									checked
								)
							);
					}}
				/>
				{interpretedLabel && (
					<label htmlFor={`checkbox-boolean-${id}`}>
						{isHorizontal ? interpretedLabel : ''}
					</label>
				)}
			</Icon>
		</>
	);
	return (
		<div key={`checkbox-boolean-${id}`} className={`checkbox-boolean-modality`}>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			{label && !isHorizontal && (
				<label htmlFor={`checkbox-boolean-${id}`}>
					{interpret(features, logFunction)(bindings)(label)}
				</label>
			)}
			<Declarations
				id={id}
				type={C.AFTER_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<div className="field-container">
				<div className={`${management ? 'field-with-tooltip' : 'field'}`}>
					{isVertical ? <div>{input}</div> : input}
				</div>
				{management && (
					<div className="tooltip">
						<TooltipResponse
							id={id}
							response={U.buildBooleanTooltipResponse(response)}
						/>
					</div>
				)}
			</div>
			<Declarations
				id={id}
				type={C.DETACHABLE}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
		</div>
	);
};

CheckboxBoolean.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	disabled: false,
	positioning: 'DEFAULT',
	focused: false,
	declarations: [],
	features: [],
	bindings: {},
	management: false,
	style: {},
};

CheckboxBoolean.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	handleChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	management: PropTypes.bool,
	style: PropTypes.object,
};

export default missingWrapper(React.memo(CheckboxBoolean, U.areEqual));
