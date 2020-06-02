import React from 'react';
import PropTypes from 'prop-types';
import Declarations from '../';
import * as U from '../../../utils/lib';
import * as C from '../../../constants';

const SimpleDeclarationsWrapper = ({
	id,
	declarations,
	features,
	bindings,
	children,
}) => (
	<>
		<Declarations
			id={id}
			type={C.BEFORE_QUESTION_TEXT}
			declarations={declarations}
			features={features}
			bindings={bindings}
		/>
		{children}
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

SimpleDeclarationsWrapper.defaultProps = {
	declarations: [],
	features: [],
	bindings: {},
};

SimpleDeclarationsWrapper.propTypes = {
	id: PropTypes.string.isRequired,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	children: PropTypes.element.isRequired,
};

export default SimpleDeclarationsWrapper;
