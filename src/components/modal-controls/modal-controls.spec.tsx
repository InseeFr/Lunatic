import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ModalControls from './modal-controls';
import { describe, expect, it, vi } from 'vitest';
import { LunaticError } from '../../use-lunatic/type';
import { Criticality, TypeOfControl } from '../../use-lunatic/type-source';

describe('ModalControls component', () => {
	it('should render correctly when there are errors', () => {
		const errors = {
			field1: [
				{
					id: 'message1',
					criticality: Criticality.ERROR,
					errorMessage: 'Error message 1',
					typeOfControl: TypeOfControl.CONSISTENCY,
				},
			],
			field2: [
				{
					id: 'message2',
					criticality: Criticality.ERROR,
					errorMessage: 'Error message 2',
					typeOfControl: TypeOfControl.CONSISTENCY,
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
	/*
	it('should call the goNext function with block:true when the close button is clicked', () => {
		const errors = {
			field1: [{ criticality: 'ERROR', errorMessage: 'Error message 1' }],
			field2: [{ criticality: 'ERROR', errorMessage: 'Error message 2' }],
		};
		const goNext = vi.fn();
		const { getByText } = render(
			<ModalControls errors={errors} goNext={goNext} />
		);
		fireEvent.click(getByText('Correct'));
		expect(goNext).toHaveBeenCalledWith({ block: true });
	});
*/
	it('should call the goNext function when the skip button is clicked', () => {
		const errors = {
			field1: [
				{
					criticality: Criticality.ERROR,
					errorMessage: 'Error message 1',
					id: 'message1',
					typeOfControl: TypeOfControl.CONSISTENCY,
				},
			],
			field2: [
				{
					criticality: Criticality.ERROR,
					errorMessage: 'Error message 2',
					id: 'message2',
					typeOfControl: TypeOfControl.CONSISTENCY,
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
