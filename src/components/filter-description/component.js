import React from 'react';

const FilterDescription = ({ id, label, filterDescription }) =>
	filterDescription ? (
		<div
			id={`filter-description-${id}`}
			aria-label={`filter-description`}
			className="filter-description-lunatic"
		>
			{label}
		</div>
	) : null;

export default FilterDescription;
