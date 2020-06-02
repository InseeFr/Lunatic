import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../constants';
import { interpret } from '../../utils/to-expose';
import './checkbox.scss';

const CheckboxGroup = ({
	id,
	label,
	preferences,
	responses,
	handleChange,
	disabled,
	focused,
	keyboardSelection,
	positioning,
	declarations,
	features,
	bindings,
	tooltip,
	style,
}) => {
	const { fieldsetStyle, modalityStyle } = style;
	const inputRef = useRef();

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	return (
		<>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<fieldset
				key={`checkbox-${id}`}
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
				{responses.map(({ id: modId, label: modLabel, response }, i) => {
					const checked = U.getResponseByPreference(preferences)(response);
					const interpretedLabel = interpret(features)(bindings)(modLabel);
					return (
						<div
							className={`${U.getItemsPositioningClass(positioning)}`}
							key={`checkbox-${id}-${modId}`}
						>
							<div className="field-container">
								<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
									<div
										className={`checkbox-modality ${
											checked ? 'content-checked' : ''
										}`}
									>
										<input
											type="checkbox"
											id={`checkbox-${id}-${modId}`}
											ref={i === 0 ? inputRef : null}
											key={`checkbox-${id}-${modId}`}
											aria-labelledby={`input-label-${id}-${modId}`}
											className="checkbox-lunatic"
											checked={checked}
											disabled={disabled}
											onChange={(e) => {
												handleChange({
													[U.getResponseName(response)]: e.target.checked,
												});
											}}
										/>
										<label
											htmlFor={`checkbox-${id}-${modId}`}
											id={`input-label-${id}-${modId}`}
											style={checked ? U.buildStyleObject(modalityStyle) : {}}
										>
											{keyboardSelection
												? `${U.getAlphabet()[
														i
												  ].toUpperCase()} - ${interpretedLabel}`
												: interpretedLabel}
										</label>
									</div>
								</div>
								{tooltip && (
									<div className="tooltip">
										<TooltipResponse
											id={id}
											response={U.buildBooleanTooltipResponse(response)}
										/>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</fieldset>
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

CheckboxGroup.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	responses: [],
	disabled: false,
	focused: false,
	keyboardSelection: false,
	positioning: 'DEFAULT',
	declarations: [],
	features: [],
	bindings: {},
	tooltip: false,
	style: { fieldsetStyle: {}, modalityStyle: {} },
};

CheckboxGroup.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
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

export default React.memo(CheckboxGroup, U.areEqual);
