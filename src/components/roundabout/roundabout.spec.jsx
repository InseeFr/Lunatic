import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Roundabout from './roundabout';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('Roundabout', () => {
	const mockGoToIteration = vi.fn();

	afterEach(() => {
		mockGoToIteration.mockClear();
	});

	const iterations = 3;
	const expressions = {
		complete: [true, false, false],
		partial: [false, true, false],
		label: ['Step 1', 'Step 2', 'Step 3'],
		unnecessary: [false, false, false],
	};
	const label = 'My Roundabout';
	const locked = false;

	it('renders the roundabout correctly', () => {
		const { getByText } = render(
			<Roundabout
				iterations={iterations}
				expressions={expressions}
				goToIteration={mockGoToIteration}
			/>
		);

		expect(getByText('Step 1')).toBeInTheDocument();
		expect(getByText('Step 2')).toBeInTheDocument();
		expect(getByText('Step 3')).toBeInTheDocument();
		expect(getByText('Complété')).toBeInTheDocument();
		expect(getByText('Modifier')).toBeInTheDocument();
		expect(getByText('Commencer')).toBeInTheDocument();
	});

	it('calls the goToIteration function when a button is clicked', () => {
		const { getByText } = render(
			<Roundabout
				iterations={iterations}
				expressions={expressions}
				goToIteration={mockGoToIteration}
				label={label}
				locked={locked}
			/>
		);

		const button = getByText('Modifier');
		fireEvent.click(button);

		expect(mockGoToIteration).toHaveBeenCalledTimes(1);
		expect(mockGoToIteration).toHaveBeenCalledWith(1);
	});

	it('disables buttons correctly when necessary', () => {
		const lockedExpressions = {
			complete: [true, false, false],
			partial: [false, true, false],
			iterationLabels: ['Step 1', 'Step 2', 'Step 3'],
			unnecessary: [false, false, false],
		};

		const { getByText } = render(
			<Roundabout
				iterations={iterations}
				expressions={lockedExpressions}
				goToIteration={mockGoToIteration}
				label={label}
				locked={true}
			/>
		);

		const completeButton = getByText('Complété');
		const unstartedButton = getByText('Commencer');

		expect(completeButton).toBeDisabled();
		expect(unstartedButton).not.toBeDisabled();
	});
});
