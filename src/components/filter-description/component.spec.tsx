import React from 'react';
import { render } from '@testing-library/react';
import FilterDescription from './component';
import { describe, it, expect } from 'vitest';

describe('FilterDescription component', () => {
	it('renders with correct label and aria-label', () => {
		const id = '1';
		const label = 'Filter description';
		const { getByLabelText } = render(
			<FilterDescription id={id} label={label} />
		);
		const filterDescriptionElement = getByLabelText('filter-description');
		expect(filterDescriptionElement).toHaveTextContent(label);
		expect(filterDescriptionElement).toHaveClass('filter-description-lunatic');
		expect(filterDescriptionElement).toHaveAttribute(
			'id',
			`filter-description-${id}`
		);
	});
});
