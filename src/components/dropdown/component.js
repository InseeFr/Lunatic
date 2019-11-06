import React from 'react';
import PropTypes from 'prop-types';
import Writable from './writable';
import Simple from './simple';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import { interpret } from '../../utils/to-expose';
import './dropdown.scss';

const Dropdown = ({
	id,
	label,
	labelPosition,
	writable,
	mandatory,
	declarations,
	features,
	bindings,
	...props
}) => {
	const { preferences, response, handleChange, tooltip, options } = props;
	const value = U.getResponseByPreference(preferences)(response);
	const handler = value =>
		handleChange({
			[U.getResponseName(response)]: value,
		});
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
					{writable ? (
						<Writable {...props} value={value} handleChange={handler} />
					) : (
						<Simple {...props} value={value} handleChange={handler} />
					)}
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
		</div>
	);
};

Dropdown.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	placeholder: '',
	writable: false,
	mandatory: false,
	tooltip: false,
	labelPosition: 'DEFAULT',
	declarations: [],
	features: [],
	bindings: {},
	tooltip: false,
	style: {},
};

Dropdown.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	options: U.optionsPropTypes,
	handleChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	writable: PropTypes.bool,
	mandatory: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default Dropdown;
