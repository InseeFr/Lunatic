import { render, fireEvent } from '@testing-library/react';
import CheckboxGroup from './checkbox-group';
import { describe, it, expect, vi } from 'vitest';

describe('CheckboxGroupCon', () => {
	const options = [
		{
			label: 'Option 1',
			checked: false,
			name: 'option1',
			onChange: vi.fn(),
		},
		{
			label: 'Option 2',
			checked: true,
			name: 'option2',
			onChange: vi.fn(),
		},
		{
			label: 'Option 3',
			checked: false,
			name: 'option3',
			onChange: vi.fn(),
		},
	];

	it('calls onClick callback when an option is clicked', () => {
		const { getByLabelText } = render(
			<CheckboxGroup options={options} id="test-checkbox-group" />
		);

		const option1 = getByLabelText('Option 1');
		const option2 = getByLabelText('Option 2');
		const option3 = getByLabelText('Option 3');

		fireEvent.click(option1);
		expect(options[0].onChange).toHaveBeenCalledTimes(1);
		expect(options[0].onChange).toHaveBeenCalledWith(true);

		fireEvent.click(option2);
		expect(options[1].onChange).toHaveBeenCalledTimes(1);
		expect(options[1].onChange).toHaveBeenCalledWith(false);

		fireEvent.click(option3);
		expect(options[2].onChange).toHaveBeenCalledTimes(1);
		expect(options[2].onChange).toHaveBeenCalledWith(true);
	});
});
