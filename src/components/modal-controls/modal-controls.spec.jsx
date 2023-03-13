import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ModalControls from './modal-controls';
import { describe, it, expect, vi } from 'vitest';
import D from '../../i18n';

describe('ModalControls component', () => {
	it('should render correctly when there are errors', () => {
		const errors = {
			field1: [{ criticality: 'ERROR', errorMessage: 'Error message 1' }],
			field2: [{ criticality: 'ERROR', errorMessage: 'Error message 2' }],
		};
		const goNext = vi.fn();
		const { getByText } = render(
			<ModalControls title="Test Modal" errors={errors} goNext={goNext} />
		);
		expect(getByText('Error message 1')).toBeInTheDocument();
		expect(getByText('Error message 2')).toBeInTheDocument();
	});

	it('should render correctly when there are no errors', () => {
		const goNext = vi.fn();
		const { queryByText } = render(
			<ModalControls title="Test Modal" goNext={goNext} />
		);
		expect(queryByText('Error message 1')).toBeNull();
		expect(queryByText('Error message 2')).toBeNull();
	});

	it('should call the goNext function with block:true when the close button is clicked', () => {
		const errors = {
			field1: [{ criticality: 'ERROR', errorMessage: 'Error message 1' }],
			field2: [{ criticality: 'ERROR', errorMessage: 'Error message 2' }],
		};
		const goNext = vi.fn();
		const { getByText } = render(
			<ModalControls title="Test Modal" errors={errors} goNext={goNext} />
		);
		fireEvent.click(getByText(D.MODAL_CORRECT));
		expect(goNext).toHaveBeenCalledWith({ block: true });
	});

	it('should call the goNext function when the skip button is clicked', () => {
		const errors = {
			field1: [{ criticality: 'ERROR', errorMessage: 'Error message 1' }],
			field2: [{ criticality: 'ERROR', errorMessage: 'Error message 2' }],
		};
		const goNext = vi.fn();
		const { getByText } = render(
			<ModalControls title="Test Modal" errors={errors} goNext={goNext} />
		);
		fireEvent.click(getByText(D.MODAL_IGNORE));
		expect(goNext).toHaveBeenCalled();
	});
});
