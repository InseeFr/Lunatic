import { render, fireEvent } from '@testing-library/react';
import CheckboxBoolean from './checkbox-boolean';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('CheckboxBoolean', () => {
	const label = 'I accept the terms and conditions';
	const description = 'You must accept the terms and conditions to continue.';
	const onClick = vi.fn();

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('renders label ', () => {
		const { getByText } = render(
			<CheckboxBoolean id="checkbox" label={label} />
		);

		expect(getByText(label)).toBeInTheDocument();
	});

	it('renders unchecked checkbox', () => {
		const { getByRole } = render(
			<CheckboxBoolean id="checkbox" label={label} description={description} />
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
				checked={true}
				onClick={onClick}
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
				onClick={onClick}
			/>
		);

		const checkbox = getByRole('checkbox');

		fireEvent.click(checkbox);

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith(true);
	});
});
