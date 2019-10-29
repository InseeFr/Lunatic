import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import { interpret } from '../../utils/to-expose';
import './checkbox.scss';

const CheckboxOne = ({
	id,
	label,
	preferences,
	response,
	options,
	handleChange,
	positioning,
	disabled,
	keyboardSelection,
	focused,
	declarations,
	features,
	bindings,
	tooltip,
	style,
}) => {
	const inputRef = useRef();

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	const { fieldsetStyle, checkboxStyle } = style;

	return (
		<>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<div className="field-container">
				<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
					<fieldset
						key={`checkbox-one-${id}`}
						className="checkbox-group"
						style={U.buildStyleObject(fieldsetStyle)}
					>
						<legend>{interpret(features)(bindings)(label)}</legend>
						<Declarations
							id={id}
							type={C.AFTER_QUESTION_TEXT}
							declarations={declarations}
							features={features}
							bindings={bindings}
						/>
						{options.map(({ label: optionLabel, value: optionValue }, i) => {
							const checked =
								U.getResponseByPreference(preferences)(response) ===
								optionValue;
							return (
								<div
									key={`checkbox-one-${id}-${optionValue}`}
									className={`checkbox-modality ${U.getItemsPositioningClass(
										positioning
									)}`}
								>
									<input
										type="checkbox"
										id={`checkbox-one-${id}-${optionValue}`}
										ref={inputRef}
										key={`checkbox-one-${id}-${optionValue}`}
										aria-labelledby={`input-label-${id}-${optionValue}`}
										className="checkbox-lunatic"
										checked={checked}
										disabled={disabled}
										onChange={() =>
											handleChange({
												[U.getResponseName(response)]: optionValue,
											})
										}
									/>
									<label
										htmlFor={`checkbox-one-${id}-${optionValue}`}
										id={`input-label-${id}-${optionValue}`}
										style={checked ? U.buildStyleObject(checkboxStyle) : {}}
									>
										{keyboardSelection
											? `${U.getAlphabet()[i].toUpperCase()} - ${optionLabel}`
											: optionLabel}
									</label>
								</div>
							);
						})}
					</fieldset>
				</div>
				{tooltip && (
					<div className="tooltip">
						<TooltipResponse
							id={id}
							response={U.buildResponse(options)(response)}
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
		</>
	);
};

CheckboxOne.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	disabled: false,
	focused: false,
	keyboardSelection: false,
	positioning: 'DEFAULT',
	declarations: [],
	features: [],
	bindings: {},
	tooltip: false,
	style: { fieldsetStyle: {}, checkboxStyle: {} },
};

CheckboxOne.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	options: U.optionsPropTypes,
	handleChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	keyboardSelection: PropTypes.bool,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default CheckboxOne;
