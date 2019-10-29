import React from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import { interpret } from '../../utils/to-expose';
import './subsequence.scss';

const Subsequence = ({
	id,
	label,
	declarations,
	features,
	bindings,
	style,
}) => (
	<>
		<Declarations
			id={id}
			type={C.BEFORE_QUESTION_TEXT}
			declarations={declarations}
			features={features}
			bindings={bindings}
		/>
		<div
			aria-label={`subsequence-${id}`}
			className="subsequence-lunatic"
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

Subsequence.defaultProps = {
	declarations: [],
	features: [],
	bindings: {},
	style: {},
};

Subsequence.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	style: PropTypes.object,
};

export default Subsequence;
