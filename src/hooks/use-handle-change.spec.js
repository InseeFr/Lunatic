import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useHandleChange } from './use-handle-change';
import { describe, it, expect, vi } from 'vitest';
describe('useHandleChange', () => {
	it('should call handleChange when valueOption is different from value', () => {
		const handleChange = vi.fn();
		const response = { name: 'some response' };
		const value = 'initial value';
		const newValue = 'new value';

		const { result } = renderHook(() =>
			useHandleChange({ handleChange, response, value })
		);
		const onChange = result.current;

		act(() => {
			onChange(newValue);
		});

		expect(handleChange).toHaveBeenCalledWith(response, newValue);
	});

	it('should not call handleChange when valueOption is equal to value', () => {
		const handleChange = vi.fn();
		const response = 'some response';
		const value = 'initial value';

		const { result } = renderHook(() =>
			useHandleChange({ handleChange, response, value })
		);
		const onChange = result.current;

		act(() => {
			onChange(value);
		});

		expect(handleChange).not.toHaveBeenCalled();
	});
});
