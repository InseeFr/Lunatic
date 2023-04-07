import {
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../../declarations';

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import * as commonPropTypes from '../../commons/prop-types';
import { DECLARATION_POSITIONS } from '../../declarations';
import FieldContainer from './field-container';
import Label from './label';
import Missing from './missing';
import VariableStatus from './variable-status';

/**
 * This functions returns declartions with "after" position if exist, else return description
 * @param {declarations, description}
 * @returns
 */
function getDescription({ declarations, description }) {
	if (Array.isArray(declarations)) {
		const found = declarations.filter(
			(v) => v.position === DECLARATION_POSITIONS.after
		);
		if (found.length) {
			return found;
		}
	}

	return description;
}

function LunaticComponentWithLabel(props) {
	const {
		id,
		preferences,
		label,
		declarations,
		value,
		children,
		management,
		description,
	} = props;
	const labelId = `label-${id}`;
	const Wrapper = management ? VariableStatus : Fragment;
	return (
		<Wrapper>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<FieldContainer value={value} id={id} preferences={preferences}>
				<Label
					htmlFor={id}
					id={labelId}
					description={getDescription({ declarations, description })}
				>
					{label}
				</Label>
				{children}
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} id={id} />
			<Missing {...props} />
		</Wrapper>
	);
}

LunaticComponentWithLabel.propTypes = {
	id: PropTypes.string.isRequired,
	preferences: PropTypes.arrayOf(commonPropTypes.valueTypePropTypes),
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	declarations: commonPropTypes.declarationsPropTypes,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
	children: PropTypes.element,
	management: PropTypes.bool,
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.array,
	]),
};

export default LunaticComponentWithLabel;
