import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
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
	tooltip,
	style,
}) => {
	const { fieldsetStyle, checkboxStyle } = style;
	const inputRef = useRef();

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	return (
		<React.Fragment>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
			/>

			<fieldset
				key={`checkbox-${id}`}
				className="checkbox-group"
				style={U.buildStyleObject(fieldsetStyle)}
			>
				<legend>{label}</legend>
				<Declarations
					id={id}
					type={C.AFTER_QUESTION_TEXT}
					declarations={declarations}
				/>
				{responses.map(({ id: modId, label: modLabel, response }, i) => {
					const checked = U.getResponseByPreference(preferences)(response);
					return (
						<div className="field-container" key={`checkbox-${id}-${modId}`}>
							<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
								<div
									className={`checkbox-modality ${U.getItemsPositioningClass(
										positioning
									)}`}
								>
									<input
										type="checkbox"
										id={`checkbox-${id}-${modId}`}
										ref={inputRef}
										key={`checkbox-${id}-${modId}`}
										aria-labelledby={`input-label-${id}-${modId}`}
										className="checkbox-lunatic"
										checked={checked}
										disabled={disabled}
										onChange={e => {
											handleChange({
												[U.getResponseName(response)]: e.target.checked,
											});
										}}
									/>
									<label
										htmlFor={`checkbox-${id}-${modId}`}
										id={`input-label-${id}-${modId}`}
										style={checked ? U.buildStyleObject(checkboxStyle) : {}}
									>
										{keyboardSelection
											? `${U.getAlphabet()[i].toUpperCase()} - ${modLabel}`
											: modLabel}
									</label>
								</div>
							</div>
							{tooltip && (
								<div className="tooltip">
									<TooltipResponse id={id} response={response} />
								</div>
							)}
						</div>
					);
				})}
			</fieldset>

			<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
		</React.Fragment>
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
	tooltip: false,
	style: { fieldsetStyle: {}, checkboxStyle: {} },
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
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default CheckboxGroup;
