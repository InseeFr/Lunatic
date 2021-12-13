import React from 'react';
import PropTypes from 'prop-types';
import { SimpleDeclarationsWrapper } from '../declarations/wrappers';
import * as U from '../../utils/lib';
import { interpret } from '../../utils/to-expose';
import './sequence.scss';

const Sequence = ({
	id,
	label,
	declarations,
	features,
	bindings,
	style,
	logFunction,
}) => (
	<SimpleDeclarationsWrapper
		id={id}
		declarations={declarations}
		features={features}
		bindings={bindings}
	>
		<div
			aria-label={`sequence-${id}`}
			className="sequence-lunatic"
			style={U.buildStyleObject(style)}
			id={`sequence-${id}`}
		>
			{interpret(features, logFunction)(bindings)(label)}
		</div>
	</SimpleDeclarationsWrapper>
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

export default React.memo(Sequence, U.areEqual);
