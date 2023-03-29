import {
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../../declarations';

import PropTypes from 'prop-types';
import React from 'react';
import { DECLARATION_POSITIONS } from '../../declarations';
import FieldContainer from './field-container';
import Label from './label';
import Missing from './missing';
import VariableStatus from './variable-status';

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
		label,
		declarations,
		value,
		children,
		management,
		description,
		handleChange,
	} = props;
	const labelId = `label-${id}`;
	console.log('Current declaration', declarations);
	const content = (
		<>
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
			<Missing {...props} handleChange={handleChange} />
		</>
	);
	return management ? <VariableStatus>{content}</VariableStatus> : content;
}
LunaticComponent.propTypes = {
	children: PropTypes.element,
};

export default LunaticComponent;
