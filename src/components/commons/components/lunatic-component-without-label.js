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
		const finded = declarations.reduce(function (what, declaration) {
			const { position, label, declarationType } = declaration;
			if (position === DECLARATION_POSITIONS.after) {
				return [...what, { label, declarationType }];
			}
			return what;
		}, []);
		if (finded.length) {
			return finded;
		}
	}

	return description;
}

function LunaticComponent(props) {
	const {
		id,
		preferences,
		declarations,
		value,
		children,
		missing,
		missingResponse,
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
			{missing && missingResponse && (
				<Missing {...props} handleChange={handleChange} />
			)}
		</>
	);
	return management ? <VariableStatus>{content}</VariableStatus> : content;
}
LunaticComponent.propTypes = {
	children: PropTypes.element,
};

export default LunaticComponent;
