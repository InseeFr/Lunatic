import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomCheckboxGroup } from './CustomCheckboxGroup';

describe('CheckboxGroupContent', () => {
	const options = [
		{
			id: '1',
			label: 'Option 1',
			checked: false,
			name: 'option1',
			onCheck: vi.fn(),
		},
		{
			id: '2',
			label: 'Option 2',
			checked: true,
			name: 'option2',
			onCheck: vi.fn(),
		},
		{
			id: '3',
			label: 'Option 3',
			checked: false,
			name: 'option3',
			onCheck: vi.fn(),
		},
	];

	it('calls onCheck callback when an option is clicked', () => {
		const { getByLabelText } = render(
			<CustomCheckboxGroup options={options} id="test-checkbox-group" />
		);

		const option1 = getByLabelText('Option 1');
		const option2 = getByLabelText('Option 2');
		const option3 = getByLabelText('Option 3');

		fireEvent.click(option1);
		expect(options[0].onCheck).toHaveBeenCalledTimes(1);
		expect(options[0].onCheck).toHaveBeenCalledWith(true);

		fireEvent.click(option2);
		expect(options[1].onCheck).toHaveBeenCalledTimes(1);
		expect(options[1].onCheck).toHaveBeenCalledWith(false);

		fireEvent.click(option3);
		expect(options[2].onCheck).toHaveBeenCalledTimes(1);
		expect(options[2].onCheck).toHaveBeenCalledWith(true);
	});
});
