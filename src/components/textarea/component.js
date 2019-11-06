import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import { interpret } from '../../utils/to-expose';
import './textarea.scss';

const Textarea = ({
	id,
	label,
	preferences,
	response,
	placeholder,
	handleChange,
	rows,
	maxLength,
	readOnly,
	labelPosition,
	mandatory,
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

	return (
		<div className={U.getLabelPositionClass(labelPosition)}>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			{label && (
				<label
					htmlFor={`textarea-${id}`}
					id={`textarea-label-${id}`}
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
					<textarea
						id={`textarea-${id}`}
						ref={inputRef}
						placeholder={placeholder}
						value={U.getResponseByPreference(preferences)(response)}
						className="textarea-lunatic"
						style={U.buildStyleObject(style)}
						rows={rows}
						maxLength={maxLength || 524288}
						readOnly={readOnly}
						mandatory={mandatory}
						aria-required={mandatory}
						onChange={e =>
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

Textarea.defaultProps = {
	preferences: ['COLLECTED'],
	response: {},
	placeholder: '',
	rows: 5,
	readOnly: false,
	labelPosition: 'DEFAULT',
	mandatory: false,
	focused: false,
	declarations: [],
	features: [],
	bindings: {},
	tooltip: false,
	style: {},
};

Textarea.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	rows: PropTypes.number.isRequired,
	maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	readOnly: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	mandatory: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default Textarea;
