import { render, fireEvent } from '@testing-library/react';
import CheckboxGroupContent from './checkbox-group-content';
import { describe, it, expect, vi } from 'vitest';

describe('CheckboxGroupContent', () => {
	const options = [
		{
			label: 'Option 1',
			checked: false,
			name: 'option1',
			onClick: vi.fn(),
			description: 'This is option 1',
		},
		{
			label: 'Option 2',
			checked: true,
			name: 'option2',
			onClick: vi.fn(),
			description: 'This is option 2',
		},
		{
			label: 'Option 3',
			checked: false,
			name: 'option3',
			onClick: vi.fn(),
			description: 'This is option 3',
		},
	];

	it('calls onClick callback when an option is clicked', () => {
		const { getByLabelText } = render(
			<CheckboxGroupContent options={options} id="test-checkbox-group" />
		);

		const option1 = getByLabelText('Option 1');
		const option2 = getByLabelText('Option 2');
		const option3 = getByLabelText('Option 3');

		fireEvent.click(option1);
		expect(options[0].onClick).toHaveBeenCalledTimes(1);
		expect(options[0].onClick).toHaveBeenCalledWith(true);

		fireEvent.click(option2);
		expect(options[1].onClick).toHaveBeenCalledTimes(1);
		expect(options[1].onClick).toHaveBeenCalledWith(false);

		fireEvent.click(option3);
		expect(options[2].onClick).toHaveBeenCalledTimes(1);
		expect(options[2].onClick).toHaveBeenCalledWith(true);
	});
});
