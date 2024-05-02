import { render, fireEvent } from '@testing-library/react';
import { CheckboxBoolean } from './CheckboxBoolean';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('CheckboxBoolean', () => {
	const label = 'I accept the terms and conditions';
	const description = 'You must accept the terms and conditions to continue.';
	const handleChanges = vi.fn();
	const response = { name: 'demo' };

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('renders label ', () => {
		const { getByText } = render(
			<CheckboxBoolean
				id="checkbox"
				label={label}
				value={true}
				handleChanges={handleChanges}
				response={response}
			/>
		);

		expect(getByText(label)).toBeInTheDocument();
	});

	it('renders unchecked checkbox', () => {
		const { getByRole } = render(
			<CheckboxBoolean
				id="checkbox"
				label={label}
				description={description}
				value={false}
				handleChanges={handleChanges}
				response={response}
			/>
		);

		const checkbox = getByRole('checkbox');

		expect(checkbox).not.toBeChecked();
		expect(checkbox).toBeEnabled();
	});

	it('renders checked checkbox', () => {
		const { getByRole } = render(
			<CheckboxBoolean
				id={'checkbox'}
				label={label}
				description={description}
				value={true}
				handleChanges={handleChanges}
				response={response}
			/>
		);

		const checkbox = getByRole('checkbox');

		expect(checkbox).toBeChecked();
		expect(checkbox).toBeEnabled();
	});

	it('calls onClick when checkbox is clicked', () => {
		const { getByRole } = render(
			<CheckboxBoolean
				id="checkbox"
				label={label}
				description={description}
				value={false}
				handleChanges={handleChanges}
				response={response}
			/>
		);

		const checkbox = getByRole('checkbox');

		fireEvent.click(checkbox);

		expect(handleChanges).toHaveBeenCalledTimes(1);
		expect(handleChanges).toHaveBeenCalledWith([{ ...response, value: true }]);
	});
});
