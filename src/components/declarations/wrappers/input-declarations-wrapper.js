import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import Declarations from '../';
import { TooltipResponse } from '../../tooltip';
import * as U from '../../../utils/lib';
import * as C from '../../../constants';
import { interpret } from '../../../utils/to-expose';

const InputDeclarationsWrapper = ({
	id,
	label,
	preferences,
	response,
	placeholder,
	handleChange,
	maxLength,
	readOnly,
	disabled,
	autoComplete,
	labelPosition,
	mandatory,
	declarations,
	features,
	bindings,
	focused,
	management,
	style,
	type,
	roleType,
}) => {
	const inputRef = useRef();

	const [value, setValue] = useState(() =>
		U.getResponseByPreference(preferences)(response)
	);

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	useEffect(() => setValue(U.getResponseByPreference(preferences)(response)), [
		response,
		preferences,
	]);

	const onChange = debounce((v) => {
		handleChange({
			[U.getResponseName(response)]: v,
		});
	}, 200);

	const Component = roleType === 'textarea' ? 'textarea' : 'input';

	return (
		<>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<div className={U.getLabelPositionClass(labelPosition)}>
				{label && (
					<label
						htmlFor={`${roleType}-${id}`}
						id={`${roleType}-label-${id}`}
						className={`${mandatory ? 'mandatory' : ''}`}
					>
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
						<Component
							type={type}
							id={`${roleType}-${id}`}
							ref={inputRef}
							value={value}
							placeholder={placeholder}
							autoComplete={autoComplete ? 'on' : 'off'}
							className={`${roleType}-lunatic`}
							style={U.buildStyleObject(style)}
							readOnly={readOnly}
							disabled={disabled}
							maxLength={maxLength || 524288}
							required={mandatory}
							aria-required={mandatory}
							onChange={({ target: { value: v } }) => {
								setValue(v);
								onChange(v);
							}}
						/>
					</div>
					{management && (
						<div className="tooltip">
							<TooltipResponse id={id} response={response} />
						</div>
					)}
				</div>
			</div>
			<Declarations
				id={id}
				type={C.DETACHABLE}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
		</>
	);
};

InputDeclarationsWrapper.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	placeholder: '',
	readOnly: false,
	disabled: false,
	autoComplete: false,
	labelPosition: 'DEFAULT',
	mandatory: false,
	focused: false,
	declarations: [],
	features: [],
	bindings: {},
	management: false,
	style: {},
};

InputDeclarationsWrapper.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	disabled: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	autoComplete: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	mandatory: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	management: PropTypes.bool,
	style: PropTypes.object,
	type: PropTypes.oneOf(['text', 'date', null]),
	roleType: PropTypes.oneOf(['input', 'datepicker', 'textarea']),
};

export default InputDeclarationsWrapper;
