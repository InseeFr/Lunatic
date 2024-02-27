import { type ReactNode } from 'react';
import { customizedComponent } from '../shared/HOC/customizedComponent';

type Props = {
	id: string;
	label?: ReactNode;
};

export const FilterDescription = customizedComponent<Props>(
	'FilterDescription',
	({ id, label }) => (
		<div
			id={`filter-description-${id}`}
			aria-label={`filter-description`}
			className="filter-description-lunatic"
		>
			{label}
		</div>
	)
);
