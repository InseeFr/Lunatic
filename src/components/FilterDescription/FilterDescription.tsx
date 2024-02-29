import { type ReactNode } from 'react';

type Props = {
	id: string;
	label?: ReactNode;
};

export const FilterDescription = ({ id, label }: Props) => (
	<div
		id={`filter-description-${id}`}
		aria-label={`filter-description`}
		className="filter-description-lunatic"
	>
		{label}
	</div>
);
