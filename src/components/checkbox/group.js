import React, { useState, useRef, useEffect } from 'react';
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

const CheckboxGroup = ({
	id,
	label,
	preferences,
	responses,
	handleChange: propsHandleChange,
	disabled,
	focused,
	keyboardSelection,
	positioning,
	declarations,
	features,
	bindings,
	management,
	style,
	logFunction,
}) => {
	const { fieldsetStyle, modalityStyle } = style;
	const inputRef = useRef();

	const [values, setValues] = useState(() =>
		responses.map(({ response }) =>
			U.getResponseByPreference(preferences)(response)
		)
	);

	const handleChange = debounce((obj) => propsHandleChange(obj), 50);

	const specificHandleChange = (e) => {
		const [key, value] = Object.entries(e)[0];
		if (value === false && U.responsesToClean(responses)(preferences)(key))
			handleChange({ [key]: null });
		else handleChange(e);
	};

	// Assume we only want to handle enable external updates
	// Don't need to check all value changes
	useEffect(() => {
		const newValues = responses.map(({ response }) =>
			U.getResponseByPreference(preferences)(response)
		);
		if (newValues.join('|') !== values.join('|')) setValues(newValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [responses, preferences]);

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	const checkedArray = [];

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
				className="checkbox-group-list"
				style={U.buildStyleObject(fieldsetStyle)}
			>
				<legend>{interpret(features, logFunction)(bindings)(label)}</legend>
				<Declarations
					id={id}
					type={C.AFTER_QUESTION_TEXT}
					declarations={declarations}
					features={features}
					bindings={bindings}
				/>
				{responses.map(({ id: modId, label: modLabel, response }, i) => {
					const checked = values[i];
					if (checked) checkedArray.push(modId);
					const toRef =
						i === 0 || (checkedArray[0] && checkedArray[0] === modId);
					const interpretedLabel = interpret(features)(bindings)(modLabel);
					return (
						<div
							className={`${U.getItemsPositioningClass(positioning)}`}
							key={`checkbox-${id}-${modId}`}
						>
							<div className="field-container">
								<div
									className={`${management ? 'field-with-tooltip' : 'field'}`}
								>
									<div
										className={`checkbox-modality ${
											checked ? 'content-checked' : ''
										}`}
									>
										<Icon type="checkbox" checked={checked} disabled={disabled}>
											<input
												type="checkbox"
												id={`checkbox-${id}-${modId}`}
												ref={toRef ? inputRef : null}
												key={`checkbox-${id}-${modId}`}
												aria-labelledby={`input-label-${id}-${modId}`}
												className="checkbox-lunatic"
												checked={checked || false}
												disabled={disabled}
												onChange={({ target: { checked } }) => {
													setValues(
														values.map((v, j) => (i === j ? checked : v))
													);
													specificHandleChange({
														[U.getResponseName(response)]: checked,
													});
													if (U.isFunction(logFunction))
														logFunction(
															U.createObjectEvent(
																`checkbox-${id}-${modId}`,
																C.INPUT_CATEGORY,
																C.EVENT_SELECTION,
																U.getResponseName(response),
																checked
															)
														);
												}}
											/>
											<label
												htmlFor={`checkbox-${id}-${modId}`}
												id={`input-label-${id}-${modId}`}
												style={checked ? U.buildStyleObject(modalityStyle) : {}}
												className="modality-label"
											>
												{keyboardSelection && (
													<span className="code-modality">
														{responses.length < 10
															? i + 1
															: U.getAlphabet()[i].toUpperCase()}
													</span>
												)}
												{interpretedLabel}
											</label>
										</Icon>
									</div>
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
	management: false,
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
	management: PropTypes.bool,
	style: PropTypes.object,
};

export default React.memo(missingWrapper(CheckboxGroup), U.areEqual);
