import React from 'react';
import PropTypes from 'prop-types';
import { SimpleDeclarationsWrapper } from '../declarations/wrappers';
import * as U from '../../utils/lib';
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
	<SimpleDeclarationsWrapper
		id={id}
		declarations={declarations}
		features={features}
		bindings={bindings}
	>
		<div
			aria-label={`subsequence-${id}`}
			className="subsequence-lunatic"
			style={U.buildStyleObject(style)}
		>
			{interpret(features)(bindings)(label)}
		</div>
	</SimpleDeclarationsWrapper>
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
