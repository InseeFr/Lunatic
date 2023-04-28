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
import { InformationMessage, ContentMessage } from '../../messages';

// TODO  fichier à renomer : lunatic-component

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
		management,
		description,
		handleChange,
		informationMessage,
		contentMessage,
	} = props;
	const content = (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<InformationMessage text={informationMessage} />
			<FieldContainer value={value} id={id} preferences={preferences}>
				{React.cloneElement(children, {
					description: getDescription({ declarations, description }),
				})}
				<ContentMessage text={contentMessage} />
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
