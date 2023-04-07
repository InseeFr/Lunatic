import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RadioGroupContent from './radio-group-content';
import { describe, it, expect, vi } from 'vitest';
const options = [
	{ value: 'option1', label: 'Option 1', description: 'Option 1 description' },
	{ value: 'option2', label: 'Option 2', description: 'Option 2 description' },
	{ value: 'option3', label: 'Option 3', description: 'Option 3 description' },
];

describe('RadioGroupContent', () => {
	it('renders all options', () => {
		const { getAllByRole } = render(
			<RadioGroupContent options={options} value="option4" checked={false} />
		);

		const radioOptions = getAllByRole('radio');

		expect(radioOptions).toHaveLength(options.length);

		radioOptions.forEach((option, index) => {
			expect(option).toHaveTextContent(options[index].label);
			expect(option).toHaveAttribute('tabIndex', '-1');
		});
	});

	it('renders checked option', () => {
		const { getByRole } = render(
			<RadioGroupContent options={options} value="option1" />
		);

		const checkedOption = getByRole('radio', { checked: true });

		expect(checkedOption).toHaveAttribute('aria-checked', 'true');
		expect(checkedOption).toHaveAttribute('tabIndex', '0');
	});

	it('calls onClick when an option is clicked', () => {
		const onClick = vi.fn();
		const { getByText } = render(
			<RadioGroupContent options={options} value="option1" onClick={onClick} />
		);

		const option2 = getByText('Option 2');

		fireEvent.click(option2);

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith('option2');
	});

	it('renders as checkbox when checkboxStyle prop is true', () => {
		const { getAllByRole } = render(
			<RadioGroupContent options={options} value="option1" checkboxStyle />
		);

		const checkboxes = getAllByRole('radio');

		expect(checkboxes).toHaveLength(options.length);
	});

	it('adds keyboard shortcuts when shortcut prop is present', () => {
		const { getByText } = render(
			<RadioGroupContent options={options} value="option1" shortcut />
		);

		const option1 = getByText('Option 1');

		expect(option1.parentNode).toHaveAttribute('tabIndex', '0');

		fireEvent.keyDown(option1, { key: '1' });

		expect(option1.parentNode).toHaveAttribute('aria-checked', 'true');
	});

	it('Click not working when disabled', () => {
		const { getByText } = render(
			<RadioGroupContent options={options} value="option1" disabled />
		);

		const option1 = getByText('Option 1');

		expect(option1.parentNode).toHaveAttribute('tabIndex', '0');

		fireEvent.keyDown(option1, { key: '1' });

		expect(option1.parentNode).toHaveAttribute('aria-checked', 'true');
	});
});
