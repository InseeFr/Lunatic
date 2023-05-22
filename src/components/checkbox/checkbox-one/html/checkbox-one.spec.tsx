import { render, fireEvent } from '@testing-library/react';
import CheckboxOne from './checkbox-one';
import { describe, it, expect, vi } from 'vitest';
describe('CheckboxOne component', () => {
	const options = [
		{ label: 'Option 1', value: 'option-1' },
		{ label: 'Option 2', value: 'option-2' },
		{ label: 'Option 3', value: 'option-3' },
	];
	const onSelect = vi.fn();

	it('renders the component with correct props', () => {
		const { getByText } = render(
			<CheckboxOne
				options={options}
				value="option-1"
				id="checkbox-one"
				onSelect={onSelect}
			/>
		);

		expect(getByText('Option 1')).toBeInTheDocument();
		expect(getByText('Option 2')).toBeInTheDocument();
		expect(getByText('Option 3')).toBeInTheDocument();
	});

	it('calls onSelect when an option is selected', () => {
		const { getByText } = render(
			<CheckboxOne
				options={options}
				value="option-1"
				id="checkbox-one"
				label="Checkbox One"
				description="Choose one option"
				onSelect={onSelect}
			/>
		);

		fireEvent.click(getByText('Option 2'));

		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onSelect).toHaveBeenCalledWith('option-2');
	});
});
