import React from 'react';
import { render } from '@testing-library/react';
import LabelSelection from './label-selection';
import { describe, it, expect } from 'vitest';

describe('LabelSelection', () => {
	const options = ['Option 1', 'Option 2', 'Option 3'];

	it('should render the labelRenderer when expended is true and editable is false', () => {
		const { getByText } = render(
			<LabelSelection
				labelRenderer={({ option }) => option}
				expended={true}
				editable={false}
				selectedIndex={0}
				options={options}
				placeholder="Select an option..."
				search="search term"
				disabled={false}
			/>
		);

		expect(getByText('Option 1')).toBeInTheDocument();
	});

	it('should add the disabled class when disabled is true', () => {
		const { container } = render(
			<LabelSelection
				labelRenderer={({ option }) => option}
				expended={true}
				editable={false}
				selectedIndex={0}
				options={options}
				placeholder="Select an option..."
				search="search term"
				disabled={true}
			/>
		);

		expect(container.firstChild).toHaveClass('disabled');
	});
});
