import { render } from '@testing-library/react';
import LabelSelection from './label-selection';
import { describe, it, expect } from 'vitest';

describe('LabelSelection', () => {
	const options = [
		{ label: 'Option 1', value: 'apple' },
		{ label: 'Option 2', value: 'orange' },
		{ label: 'Option 3', value: 'banana' },
	];

	it('should render the labelRenderer when expanded is true and editable is false', () => {
		const { getByText } = render(
			<LabelSelection
				selectedIndex={0}
				options={options}
				placeholder="Select an option..."
				search="search term"
				disabled={false}
			/>
		);

		expect(getByText('apple - Option 1')).toBeInTheDocument();
	});

	it('should add the disabled class when disabled is true', () => {
		const { getByText } = render(
			<LabelSelection
				selectedIndex={0}
				options={options}
				placeholder="Select an option..."
				search="search term"
				disabled={true}
			/>
		);
		expect(getByText('apple - Option 1').parentElement).toHaveClass('disabled');
	});
});
