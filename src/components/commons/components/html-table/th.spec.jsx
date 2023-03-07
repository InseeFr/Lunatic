import React from 'react';
import { render } from '@testing-library/react';
import Th from './th';
import { expect, describe, it } from 'vitest';

describe('<Th />', () => {
	const props = {
		id: 'test-id',
		index: 1,
		colSpan: 2,
		rowSpan: 3,
		className: 'test-class',
		children: 'test children',
	};

	it('renders children', () => {
		const { getByRole } = render(<Th {...props} />);
		expect(getByRole('columnheader')).toHaveTextContent(props.children);
	});

	it('renders with correct attributes', () => {
		const { getByRole } = render(<Th {...props} />);
		const th = getByRole('columnheader');
		expect(th).toHaveAttribute(
			'id',
			`lunatic-table-th-${props.id}-${props.index}`
		);
		expect(th).toHaveAttribute('colSpan', props.colSpan.toString());
		expect(th).toHaveAttribute('rowSpan', props.rowSpan.toString());
		expect(th).toHaveClass(props.className);
	});
});
