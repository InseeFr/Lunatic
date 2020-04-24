import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../';
import { TooltipResponse } from '../../tooltip';
import * as U from '../../../utils/lib';
import * as C from '../../../utils/constants';
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
	tooltip,
	style,
	type,
	roleType,
}) => {
	const inputRef = useRef();

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

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
					<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
						<Component
							type={type}
							id={`${roleType}-${id}`}
							ref={inputRef}
							value={U.getResponseByPreference(preferences)(response)}
							placeholder={placeholder}
							autoComplete={autoComplete ? 'on' : 'off'}
							className={`${roleType}-lunatic`}
							style={U.buildStyleObject(style)}
							readOnly={readOnly}
							disabled={disabled}
							maxLength={maxLength || 524288}
							required={mandatory}
							aria-required={mandatory}
							onChange={(e) =>
								handleChange({
									[U.getResponseName(response)]: e.target.value,
								})
							}
						/>
					</div>
					{tooltip && (
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
	tooltip: false,
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
	tooltip: PropTypes.bool,
	style: PropTypes.object,
	type: PropTypes.oneOf(['text', 'date', null]),
	roleType: PropTypes.oneOf(['input', 'datepicker', 'textarea']),
};

export default InputDeclarationsWrapper;
