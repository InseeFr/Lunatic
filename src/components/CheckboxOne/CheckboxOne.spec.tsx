import { render, fireEvent } from '@testing-library/react';
import { CheckboxOne } from './CheckboxOne';
import { describe, it, expect, vi } from 'vitest';
import type { InterpretedOption } from '../../use-lunatic/props/propOptions';
describe('CheckboxOne component', () => {
	const onCheck = vi.fn();
	const options = [
		{ label: 'Option 1', value: 'option-1', onCheck: onCheck, checked: false },
		{ label: 'Option 2', value: 'option-2', onCheck: onCheck, checked: false },
		{ label: 'Option 3', value: 'option-3', onCheck: onCheck, checked: false },
	] satisfies InterpretedOption[];

	it('renders the component with correct props', () => {
		const { getByText } = render(
			<CheckboxOne
				options={options}
				value="option-1"
				id="checkbox-one"
				handleChanges={onCheck}
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
				handleChanges={onCheck}
			/>
		);

		fireEvent.click(getByText('Option 2'));

		expect(onCheck).toHaveBeenCalledTimes(1);
	});
});
