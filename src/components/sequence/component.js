import React from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import { interpret } from '../../utils/to-expose';
import './sequence.scss';

const Sequence = ({ id, label, declarations, features, bindings, style }) => (
	<>
		<Declarations
			id={id}
			type={C.BEFORE_QUESTION_TEXT}
			declarations={declarations}
			features={features}
			bindings={bindings}
		/>
		<div
			aria-label={`sequence-${id}`}
			className="sequence-lunatic"
			style={U.buildStyleObject(style)}
		>
			{interpret(features)(bindings)(label)}
		</div>
		<Declarations
			id={id}
			type={C.AFTER_QUESTION_TEXT}
			declarations={declarations}
			features={features}
			bindings={bindings}
		/>
		<Declarations
			id={id}
			type={C.DETACHABLE}
			declarations={declarations}
			features={features}
			bindings={bindings}
		/>
	</>
);

Sequence.defaultProps = {
	declarations: [],
	features: [],
	bindings: {},
	style: {},
};

Sequence.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	style: PropTypes.object,
};

export default Sequence;
