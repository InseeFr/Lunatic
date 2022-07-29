import React from 'react';

const FilterDescription = ({ id, label }) => (
	<div
		id={`filter-description-${id}`}
		aria-label={`filter-description`}
		className="filter-description-lunatic"
	>
		{label}
	</div>
);

export default FilterDescription;
