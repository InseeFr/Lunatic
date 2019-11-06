import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TooltipResponse } from '../tooltip';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import { interpret } from '../../utils/to-expose';
import './datepicker.scss';

const Datepicker = ({
	id,
	label,
	preferences,
	response,
	placeholder,
	handleChange,
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
						htmlFor={`datepicker-${id}`}
						id={`input-label-${id}`}
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
						<input
							type="date"
							id={`datepicker-${id}`}
							ref={inputRef}
							value={U.getResponseByPreference(preferences)(response)}
							placeholder={placeholder || ''}
							className="datepicker-lunatic"
							style={U.buildStyleObject(style)}
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

Datepicker.defaultProps = {
	preferences: ['COLLECTED'],
	placeholder: '',
	readOnly: false,
	labelPosition: 'DEFAULT',
	mandatory: false,
	focused: false,
	response: {},
	declarations: [],
	features: [],
	bindings: {},
	tooltip: false,
	style: {},
};

Datepicker.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
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

export default Datepicker;
