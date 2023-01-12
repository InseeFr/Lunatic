import React from 'react';
import PropTypes from 'prop-types';
import FieldContainer from './field-container';
import { DECLARATION_POSITIONS } from '../../declarations';
import VariableStatus from './variable-status';
import {
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../../declarations';
import Missing from './missing';

function getDescription({ declarations, description }) {
	if (Array.isArray(declarations)) {
		return declarations.reduce(function (what, declaration) {
			const { position, label } = declaration;
			if (position === DECLARATION_POSITIONS.after) {
				return label;
			}
			return what;
		}, description);
	}

	return description;
}

function LunaticComponent(props) {
	const {
		id,
		custom,
		preferences,
		declarations,
		value,
		children,
		missing,
		missingResponse,
		management,
		description,
	} = props;
	const content = (
		<>
			<DeclarationsBeforeText
				declarations={declarations}
				id={id}
				custom={custom}
			/>
			<FieldContainer
				value={value}
				id={id}
				custom={custom}
				preferences={preferences}
			>
				{React.cloneElement(children, {
					description: getDescription({ declarations, description }),
				})}
			</FieldContainer>
			<DeclarationsDetachable
				declarations={declarations}
				id={id}
				custom={custom}
			/>
			{missing && missingResponse && <Missing {...props} />}
		</>
	);
	return management ? <VariableStatus>{content}</VariableStatus> : content;
}
LunaticComponent.propTypes = {
	children: PropTypes.element,
};

export default LunaticComponent;
