import { type ReactNode } from 'react';
import { createCustomizableLunaticField } from '../commons';

type Props = {
	id: string;
	label?: ReactNode;
};

const FilterDescription = ({ id, label }: Props) => (
	<div
		id={`filter-description-${id}`}
		aria-label={`filter-description`}
		className="filter-description-lunatic"
	>
		{label}
	</div>
);

export default createCustomizableLunaticField(
	FilterDescription,
	'FilterDescription'
);
