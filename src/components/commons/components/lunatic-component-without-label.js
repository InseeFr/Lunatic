import {
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../../declarations';

import { DECLARATION_POSITIONS } from '../../declarations';
import FieldContainer from './field-container';
import Missing from './missing';
import PropTypes from 'prop-types';
import React from 'react';
import VariableStatus from './variable-status';

function getDescription({ declarations, description }) {
	if (Array.isArray(declarations)) {
		return declarations.reduce(function (what, declaration) {
			const { position, label, declarationType } = declaration;
			if (position === DECLARATION_POSITIONS.after) {
				return [...what, { label, declarationType }];
			}
			return what;
		}, []); // Array<string | JSX.element>
	}

	return description; // string | JSX.element
}

function LunaticComponent(props) {
	const {
		id,
		preferences,
		declarations,
		value,
		children,
		management,
		description,
		handleChange,
	} = props;
	const content = (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<FieldContainer value={value} id={id} preferences={preferences}>
				{React.cloneElement(children, {
					description: getDescription({ declarations, description }),
				})}
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} id={id} />
			<Missing {...props} handleChange={handleChange} />
		</>
	);
	return management ? <VariableStatus>{content}</VariableStatus> : content;
}
LunaticComponent.propTypes = {
	children: PropTypes.element,
};

export default LunaticComponent;
