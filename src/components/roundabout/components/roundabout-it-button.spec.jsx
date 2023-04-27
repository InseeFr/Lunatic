import { render, fireEvent } from '@testing-library/react';
import RoundaboutItButton from './roundabout-it-button';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('RoundaboutItButton', () => {
	const goToIterationMock = vi.fn();

	afterEach(() => {
		goToIterationMock.mockClear();
	});

	it('renders "Commencer" label when neither complete nor partial nor unnecessary', () => {
		const { getByText } = render(
			<RoundaboutItButton
				iteration={1}
				goToIteration={goToIterationMock}
				locked={false}
			/>
		);

		expect(getByText('Commencer')).toBeInTheDocument();
	});

	it('renders "Modifier" label when partial', () => {
		const { getByText } = render(
			<RoundaboutItButton
				iteration={1}
				goToIteration={goToIterationMock}
				locked={false}
				partial={true}
			/>
		);

		expect(getByText('Modifier')).toBeInTheDocument();
	});

	it('renders "Complété" label when complete', () => {
		const { getByText } = render(
			<RoundaboutItButton
				iteration={1}
				goToIteration={goToIterationMock}
				locked={false}
				complete={true}
			/>
		);

		expect(getByText('Complété')).toBeInTheDocument();
	});

	it('renders "Non concerné" label when unnecessary', () => {
		const { getByText } = render(
			<RoundaboutItButton
				iteration={1}
				goToIteration={goToIterationMock}
				locked={false}
				unnecessary={true}
			/>
		);

		expect(getByText('Non concerné')).toBeInTheDocument();
	});

	it('calls goToIteration with correct iteration number when clicked', () => {
		const { getByRole } = render(
			<RoundaboutItButton
				iteration={1}
				goToIteration={goToIterationMock}
				locked={false}
			/>
		);

		fireEvent.click(getByRole('button'));

		expect(goToIterationMock).toHaveBeenCalledWith(1);
	});

	it('is disabled when locked and complete', () => {
		const { getByRole } = render(
			<RoundaboutItButton
				iteration={1}
				goToIteration={goToIterationMock}
				locked={true}
				complete={true}
			/>
		);

		expect(getByRole('button')).toBeDisabled();
	});

	it('is disabled when locked and not complete', () => {
		const { getByRole } = render(
			<RoundaboutItButton
				iteration={1}
				goToIteration={goToIterationMock}
				locked={true}
				complete={true}
			/>
		);

		expect(getByRole('button')).toBeDisabled();
	});

	it('is not disabled when unlocked and not complete', () => {
		const { getByRole } = render(
			<RoundaboutItButton
				iteration={1}
				goToIteration={goToIterationMock}
				locked={false}
				complete={false}
			/>
		);

		expect(getByRole('button')).not.toBeDisabled();
	});

	it('is disabled when unnecessary', () => {
		const { getByRole } = render(
			<RoundaboutItButton
				iteration={1}
				goToIteration={goToIterationMock}
				locked={false}
				unnecessary={true}
			/>
		);

		expect(getByRole('button')).toBeDisabled();
	});
});
