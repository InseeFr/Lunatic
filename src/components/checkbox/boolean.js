import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Declarations from '../declarations';
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

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	const isVertical = positioning === 'VERTICAL';
	const isHorizontal = positioning === 'HORIZONTAL';
	const input = (
		<>
			<input
				type="checkbox"
				id={`checkbox-boolean-${id}`}
				ref={inputRef}
				title={label ? label : 'empty-label'}
				className={`checkbox-boolean-lunatic${isVertical ? '-no-margin' : ''}`}
				style={U.buildStyleObject(style)}
				checked={value}
				disabled={disabled}
				onChange={({ target: { checked } }) => {
					setValue(checked);
					specificHandleChange({
						[U.getResponseName(response)]: checked,
					});
				}}
			/>
			{label && (
				<label htmlFor={`checkbox-boolean-${id}`}>
					{isHorizontal ? interpret(features)(bindings)(label) : ''}
				</label>
			)}
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
					{interpret(features)(bindings)(label)}
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

export default React.memo(CheckboxBoolean, U.areEqual);
