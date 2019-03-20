import React from 'react';
import PropTypes from 'prop-types';
import * as C from '../../utils/constants';
import './declarations.scss';

const Declarations = ({ id, type, declarations }) => {
	const filtered = declarations.filter(({ position }) => position === type);
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
};

Declarations.defaultProps = {
	type: 'AFTER_QUESTION_TEXT',
	declarations: [],
};

Declarations.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string,
	declarations: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			declarationType: PropTypes.oneOf([
				C.INSTRUCTION,
				C.COMMENT,
				C.HELP,
				C.WARNING,
			]),
			position: PropTypes.oneOf([
				C.BEFORE_QUESTION_TEXT,
				C.AFTER_QUESTION_TEXT,
				C.DETACHABLE,
			]),
			label: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default Declarations;
