import React from 'react';
import './declarations.scss';
// import PropTypes from 'prop-types';

// interpret(features, logFunction)(bindings)(label)

export const DECLARATION_POSITIONS = {
	after: 'AFTER_QUESTION_TEXT',
	before: 'BEFORE_QUESTION_TEXT',
	detachable: 'DETACHABLE',
};

function Declarations({
	id,
	type,
	declarations,
	features,
	bindings,
	logFunction,
}) {
	const filtered = declarations.filter(({ position }) => position === type);
	if (filtered.length === 0) return null;
	return (
		<div id={`declarations-${id}-${type}`} className="declarations-lunatic">
			{filtered.map(({ id: idD, label, declarationType }) => (
				<div
					key={`${idD}`}
					className={`declaration-lunatic declaration-${declarationType.toLowerCase()}`}
				>
					{label}
				</div>
			))}
		</div>
	);
}

Declarations.defaultProps = {
	type: 'AFTER_QUESTION_TEXT',
	declarations: [],
	features: [],
	bindings: {},
};

Declarations.propTypes = {
	// id: PropTypes.string.isRequired,
	// type: PropTypes.string,
	// declarations: U.declarationsPropTypes,
	// features: PropTypes.arrayOf(PropTypes.string),
	// bindings: PropTypes.object,
};

export default Declarations;
