import React from 'react';
import PropTypes from 'prop-types';
import { interpret } from '../../utils/to-expose';
import { buildStyleObject } from '../../utils/lib';

// const FilterDescription = ({
// 	id,
// 	label,
// 	filterDescription,
// 	features,
// 	bindings,
// 	style,
// 	logFunction,
// }) =>
// 	filterDescription ? (
// 		<div
// 			id={`filter-description-${id}`}
// 			aria-label={`filter-description`}
// 			className="filter-description-lunatic"
// 			style={buildStyleObject(style)}
// 		>
// 			{interpret(features, logFunction)(bindings)(label)}
// 		</div>
// 	) : null;

// FilterDescription.defaultProps = {
// 	filterDescription: false,
// 	features: [],
// 	bindings: {},
// 	style: {},
// };

// FilterDescription.propTypes = {
// 	id: PropTypes.string.isRequired,
// 	label: PropTypes.string.isRequired,
// 	filterDescription: PropTypes.bool,
// 	features: PropTypes.arrayOf(PropTypes.string),
// 	bindings: PropTypes.object,
// 	style: PropTypes.object,
// };

// export default FilterDescription;

function FilterDescription() {
	return null;
}

export default FilterDescription;
