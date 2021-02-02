import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Declarations from '../';
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
	declarations,
	features,
	bindings,
	management,
	style,
	positioning,
	type,
	hasSpecificHandler,
}) => {
	const inputRef = useRef();

	const [value, setValue] = useState(() =>
		U.getResponseByPreference(preferences)(response)
	);

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
	};

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
						className={`${type}-group`}
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
							const checked = value === optionValue;
							const interpretedLabel = interpret(features)(bindings)(
								optionLabel
							);
							return (
								<div
									key={`${type}-${id}-${optionValue}`}
									className={`${type}-modality ${U.getItemsPositioningClass(
										positioning
									)} ${checked ? 'content-checked' : ''}`}
								>
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
									>
										{keyboardSelection && (
											<span className="code-modality">
												{options.length < 10
													? i + 1
													: U.getAlphabet()[i].toUpperCase()}
											</span>
										)}
										{interpretedLabel}
									</label>
								</div>
							);
						})}
					</fieldset>
				</div>
				{management && (
					<div className="tooltip">
						<TooltipResponse
							id={id}
							response={U.buildMultiTooltipResponse(options)(response)}
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
