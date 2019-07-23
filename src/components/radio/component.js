import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import './radio.scss';

const Radio = ({
	id,
	label,
	preferences,
	response,
	options,
	handleChange,
	disabled,
	focused,
	keyboardSelection,
	declarations,
	tooltip,
	style,
	positioning,
}) => {
	const inputRef = useRef();

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	const { fieldsetStyle, radioStyle } = style;
	return (
		<React.Fragment>
			<Declarations
				id={id}
				type={U.BEFORE_QUESTION_TEXT}
				declarations={declarations}
			/>
			<div className="field-container">
				<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
					<fieldset
						key={`radio-${id}`}
						className="radio-group"
						style={U.buildStyleObject(fieldsetStyle)}
					>
						<legend>{label}</legend>
						<Declarations
							id={id}
							type={U.AFTER_QUESTION_TEXT}
							declarations={declarations}
						/>
						{options.map(({ label: optionLabel, value: optionValue }, i) => {
							const checked =
								U.getResponseByPreference(preferences)(response) ===
								optionValue;
							return (
								<div
									key={`radio-${id}-${optionValue}`}
									className={`radio-modality ${U.getItemsPositioningClass(
										positioning
									)}`}
								>
									<input
										type="radio"
										name={`radio-${id}`}
										ref={inputRef}
										id={`radio-${id}-${optionValue}`}
										aria-labelledby={`input-label-${id}-${optionValue}`}
										className="radio-lunatic"
										style={U.buildStyleObject(style)}
										checked={checked}
										disabled={disabled}
										onChange={() =>
											handleChange({
												[U.getResponseName(response)]: optionValue,
											})
										}
									/>
									<label
										htmlFor={`radio-${id}-${optionValue}`}
										id={`input-label-${id}-${optionValue}`}
										style={checked ? U.buildStyleObject(radioStyle) : {}}
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
						<TooltipResponse id={id} response={response} />
					</div>
				)}
			</div>
			<Declarations id={id} type={U.DETACHABLE} declarations={declarations} />
		</React.Fragment>
	);
};

Radio.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	options: [],
	disabled: false,
	focused: false,
	keyboardSelection: false,
	positioning: 'DEFAULT',
	declarations: [],
	tooltip: false,
	style: { fieldsetStyle: {}, radioStyle: {} },
};

Radio.propTypes = {
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
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default Radio;
