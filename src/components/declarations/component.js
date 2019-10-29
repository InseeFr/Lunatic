import React from 'react';
import PropTypes from 'prop-types';
import * as U from '../../utils/lib';
import { interpret } from '../../utils/to-expose';
import './declarations.scss';

const Declarations = ({ id, type, declarations, features, bindings }) => {
	const filtered = declarations.filter(({ position }) => position === type);
	return (
		<div id={`declarations-${id}-${type}`} className="declarations-lunatic">
			{filtered.map(({ id: idD, label, declarationType }) => (
				<div
					key={`${idD}`}
					className={`declaration-lunatic declaration-${declarationType.toLowerCase()}`}
				>
					{interpret(features)(bindings)(label)}
				</div>
			))}
		</div>
	);
};

Declarations.defaultProps = {
	type: 'AFTER_QUESTION_TEXT',
	declarations: [],
	features: [],
	bindings: {},
};

Declarations.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
};

export default Declarations;
