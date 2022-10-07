import React from 'react';
import { createCustomizableLunaticField } from '../commons';

const FilterDescription = ({ id, label }) => (
	<div
		id={`filter-description-${id}`}
		aria-label={`filter-description`}
		className="filter-description-lunatic"
	>
		{label}
	</div>
);

export default createCustomizableLunaticField(FilterDescription);
