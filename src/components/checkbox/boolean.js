import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import { interpret } from '../../utils/to-expose';
import './checkbox.scss';

const CheckboxBoolean = ({
	id,
	label,
	preferences,
	response,
	handleChange,
	disabled,
	positioning,
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

	const isVertical = positioning === 'VERTICAL';
	const input = (
		<>
			<input
				type="checkbox"
				id={`checkbox-boolean-${id}`}
				ref={inputRef}
				title={label ? label : 'empty-label'}
				className={`checkbox-boolean-lunatic${isVertical ? '-no-margin' : ''}`}
				style={U.buildStyleObject(style)}
				checked={U.getResponseByPreference(preferences)(response)}
				disabled={disabled}
				onChange={e => {
					handleChange({
						[U.getResponseName(response)]: e.target.checked,
					});
				}}
			/>
			<label htmlFor={`checkbox-boolean-${id}`}></label>
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
			{label && (
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
				<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
					{isVertical ? <div>{input}</div> : input}
				</div>
				{tooltip && (
					<div className="tooltip">
						<TooltipResponse id={id} response={response} />
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
	tooltip: false,
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
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default CheckboxBoolean;
