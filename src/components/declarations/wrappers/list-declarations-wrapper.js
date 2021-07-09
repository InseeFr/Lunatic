import React, { useState, useEffect, useRef } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Declarations from '../';
import Icon from '../../icon';
import { TooltipResponse } from '../../tooltip';
import * as U from '../../../utils/lib';
import * as C from '../../../constants';
import { interpret } from '../../../utils/to-expose';

const ListDeclarationsWrapper = ({
	id,
	label,
	preferences,
	response,
	options,
	handleChange: propsHandleChange,
	disabled,
	focused,
	keyboardSelection,
	shortCut,
	declarations,
	features,
	bindings,
	management,
	style,
	positioning,
	type,
	hasSpecificHandler,
	logFunction,
}) => {
	const inputRef = useRef();

	const [value, setValue] = useState(() =>
		U.getResponseByPreference(preferences)(response)
	);

	const filledOptions =
		management && type === 'checkbox'
			? [...options, { label: 'NR', value: '_N_R_' }]
			: options;

	const specificHandleChange = (e) => {
		const { values } = response;
		const [key, value] = Object.entries(e)[0];
		const newValue =
			values[preferences[preferences.length - 1]] === value ? null : value;
		handleChange({ [key]: newValue });
		if (management) {
			setValue(
				U.getResponseByPreference(preferences)(
					U.buildLocalResponse(response, newValue)
				)
			);
		} else setValue(newValue);
	};

	const handleChange = debounce((obj) => propsHandleChange(obj), 50);

	const onChange = (v) => {
		const update = {
			[U.getResponseName(response)]: v,
		};
		if (hasSpecificHandler) specificHandleChange(update);
		else {
			setValue(v);
			handleChange(update);
		}
		if (U.isFunction(logFunction))
			logFunction(
				U.createObjectEvent(
					`${type}-${id}-${v}`,
					C.INPUT_CATEGORY,
					C.EVENT_SELECTION,
					U.getResponseName(response),
					v
				)
			);
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

	const { fieldsetStyle, modalityStyle } = style;
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
				<div className={`${management ? 'field-with-tooltip' : 'field'}`}>
					<fieldset
						key={`${type}-${id}`}
						className={`${type}-group-list`}
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
						{filledOptions.map(
							({ label: optionLabel, value: optionValue }, i) => {
								const checked = value === optionValue;
								const interpretedLabel = interpret(
									features,
									logFunction
								)(bindings)(optionLabel);
								const keyboardSelectionKey =
									options.length < 10 ? `${i + 1}` : U.getAlphabet()[i];
								return (
									<div
										key={`${type}-${id}-${optionValue}`}
										className={`${type}-modality ${type}-modality-block ${U.getItemsPositioningClass(
											positioning
										)} ${checked ? 'content-checked' : ''} ${
											optionValue === '_N_R_' ? 'modality_NR' : ''
										}`}
									>
										<Icon type={type} checked={checked} disabled={disabled}>
											<input
												type={type}
												name={`${type}-${id}`}
												ref={i === 0 || checked ? inputRef : null}
												id={`${type}-${id}-${optionValue}`}
												aria-labelledby={`input-label-${id}-${optionValue}`}
												className={`${type}-lunatic`}
												style={U.buildStyleObject(style)}
												checked={checked}
												disabled={disabled}
												onChange={(optionLabel) => onChange(optionValue)}
											/>
											<label
												htmlFor={`${type}-${id}-${optionValue}`}
												id={`input-label-${id}-${optionValue}`}
												style={checked ? U.buildStyleObject(modalityStyle) : {}}
												className="modality-label"
											>
												{keyboardSelection && (
													<span className="code-modality">
														{keyboardSelectionKey.toUpperCase()}
													</span>
												)}
												{interpretedLabel}
											</label>
										</Icon>
										{shortCut && (
											<KeyboardEventHandler
												handleKeys={[keyboardSelectionKey.toLowerCase()]}
												onKeyEvent={(key, e) => {
													e.preventDefault();
													onChange(optionValue);
												}}
												handleFocusableElements
											/>
										)}
									</div>
								);
							}
						)}
					</fieldset>
				</div>
				{management && (
					<div className="tooltip">
						<TooltipResponse
							id={id}
							response={U.buildMultiTooltipResponse(filledOptions)(response)}
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

ListDeclarationsWrapper.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	options: [],
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

ListDeclarationsWrapper.propTypes = {
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
	management: PropTypes.bool,
	style: PropTypes.object,
	type: PropTypes.oneOf(['radio', 'checkbox']),
};

export default ListDeclarationsWrapper;
