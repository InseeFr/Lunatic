import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useOnHandleChange from './use-on-handle-change';
import { describe, it, expect, vi } from 'vitest';
describe('useOnHandleChange', () => {
	it('should call handleChange when valueOption is different from value', () => {
		const handleChange = vi.fn();
		const response = 'some response';
		const value = 'initial value';
		const newValue = 'new value';

		const { result } = renderHook(() =>
			useOnHandleChange({ handleChange, response, value })
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
			useOnHandleChange({ handleChange, response, value })
		);
		const onChange = result.current;

		act(() => {
			onChange(value);
		});

		expect(handleChange).not.toHaveBeenCalled();
	});
});
