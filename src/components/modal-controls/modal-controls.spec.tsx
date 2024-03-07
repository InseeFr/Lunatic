import { fireEvent, render } from '@testing-library/react';
import ModalControls from './modal-controls';
import { describe, expect, it, vi } from 'vitest';
import type { LunaticError } from '../../use-lunatic/type';

describe('ModalControls component', () => {
	it('should render correctly when there are errors', () => {
		const errors = {
			field1: [
				{
					id: 'message1',
					criticality: 'ERROR',
					errorMessage: 'Error message 1',
					typeOfControl: 'CONSISTENCY',
				},
			],
			field2: [
				{
					id: 'message2',
					criticality: 'ERROR',
					errorMessage: 'Error message 2',
					typeOfControl: 'CONSISTENCY',
				},
			],
		} satisfies Record<string, LunaticError[]>;
		const goNext = vi.fn();
		const { getByText } = render(
			<ModalControls errors={errors} goNext={goNext} onClose={() => {}} />
		);
		expect(getByText('Error message 1')).toBeInTheDocument();
		expect(getByText('Error message 2')).toBeInTheDocument();
	});

	it('should render correctly when there are no errors', () => {
		const goNext = vi.fn();
		const { queryByText } = render(
			<ModalControls errors={{}} goNext={goNext} onClose={() => {}} />
		);
		expect(queryByText('Error message 1')).toBeNull();
		expect(queryByText('Error message 2')).toBeNull();
	});

	it('should call the goNext function when the skip button is clicked', () => {
		const errors = {
			field1: [
				{
					criticality: 'ERROR',
					errorMessage: 'Error message 1',
					id: 'message1',
					typeOfControl: 'CONSISTENCY',
				},
			],
			field2: [
				{
					criticality: 'ERROR',
					errorMessage: 'Error message 2',
					id: 'message2',
					typeOfControl: 'CONSISTENCY',
				},
			],
		} satisfies Record<string, LunaticError[]>;
		const goNext = vi.fn();
		const { getByText } = render(
			<ModalControls errors={errors} goNext={goNext} onClose={() => {}} />
		);
		fireEvent.click(getByText('Ignore'));
		expect(goNext).toHaveBeenCalled();
	});
});
