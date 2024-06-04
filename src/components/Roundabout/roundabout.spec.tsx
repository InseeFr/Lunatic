import React, { type ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CustomRoundabout } from './CustomRoundabout';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('Roundabout', () => {
	const mockGoToIteration = vi.fn();

	afterEach(() => {
		mockGoToIteration.mockClear();
	});

	const items = [
		{
			label: 'Step 1',
			progress: -1,
		},
		{
			label: 'Step 2',
			progress: 0,
		},
		{
			label: 'Step 3',
			progress: 1,
		},
	];
	const label = 'My Roundabout';

	it('renders the roundabout correctly', () => {
		const { getByText } = render(
			<CustomRoundabout items={items} goToIteration={mockGoToIteration} />
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
			<CustomRoundabout
				items={items}
				goToIteration={mockGoToIteration}
				label={label}
			/>
		);

		const button = getByText('Modifier');
		fireEvent.click(button);

		expect(mockGoToIteration).toHaveBeenCalledTimes(1);
		expect(mockGoToIteration).toHaveBeenCalledWith(1);
	});
});
