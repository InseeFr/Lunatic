import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useLoopUtils } from './utils';

describe('useLoopUtils()', () => {
	it('should handleChange with iteration where values have not the right size', () => {
		const mockHandleChange = vi.fn();

		renderHook(() =>
			useLoopUtils({
				handleChanges: mockHandleChange,
				iterations: 5,
				lines: { min: 2, max: 10 },
				value: { NAME: ['John', 'Doe'], AGE: [10, 20] },
			})
		);

		expect(mockHandleChange).toHaveBeenCalledOnce();
		expect(mockHandleChange).toHaveBeenCalledWith([
			{ name: 'NAME', value: null, iteration: [2] },
			{ name: 'NAME', value: null, iteration: [3] },
			{ name: 'NAME', value: null, iteration: [4] },
			{ name: 'AGE', value: null, iteration: [2] },
			{ name: 'AGE', value: null, iteration: [3] },
			{ name: 'AGE', value: null, iteration: [4] },
		]);
	});

	it('should NOT handleChange where values have the right size', () => {
		const mockHandleChange = vi.fn();

		renderHook(() =>
			useLoopUtils({
				handleChanges: mockHandleChange,
				iterations: 2,
				lines: { min: 2, max: 10 },
				value: { NAME: ['John', 'Doe'], AGE: [10, 20] },
			})
		);

		expect(mockHandleChange).toHaveBeenCalledTimes(0);
	});

	it('should handleChange with iteration when adding row', () => {
		const mockHandleChange = vi.fn();

		// Given
		const { result } = renderHook(() =>
			useLoopUtils({
				handleChanges: mockHandleChange,
				iterations: 2,
				lines: { min: 2, max: 10 },
				value: { NAME: ['John', 'Doe'], AGE: [10, 20] },
			})
		);
		// When
		result.current.addRow();

		// Then
		expect(mockHandleChange).toHaveBeenCalledWith([
			{ name: 'NAME', value: null, iteration: [2] },
			{ name: 'AGE', value: null, iteration: [2] },
		]);
	});

	it('should handleChange with iteration when removing row', () => {
		const mockHandleChange = vi.fn();
		// Given
		const { result } = renderHook(() =>
			useLoopUtils({
				handleChanges: mockHandleChange,
				iterations: 3,
				lines: { min: 2, max: 10 },
				value: { NAME: ['John', 'Doe', 'Smith'], AGE: [10, 20, 30] },
			})
		);
		// When
		result.current.removeRow();

		// Then
		expect(mockHandleChange).toHaveBeenCalledWith([
			{ name: 'NAME', value: ['John', 'Doe'] },
			{ name: 'AGE', value: [10, 20] },
		]);
	});
});
