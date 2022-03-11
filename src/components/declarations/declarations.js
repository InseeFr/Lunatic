import React from 'react';
import './declarations.scss';
import Declaration from './declaration';

export const DECLARATION_POSITIONS = {
	after: 'AFTER_QUESTION_TEXT',
	before: 'BEFORE_QUESTION_TEXT',
	detachable: 'DETACHABLE',
};

function Declarations({ id, type, declarations, logFunction }) {
	const filtered = declarations.filter(({ position }) => position === type);
	if (filtered.length === 0) return null;

	return (
		<div id={`declarations-${id}-${type}`} className="declarations-lunatic">
			{filtered.map(({ id: idD, label, declarationType }) => (
				<Declaration key={`${idD}`} type={declarationType.toLowerCase()}>
					{label}
				</Declaration>
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

Declarations.propTypes = {};

export default Declarations;
