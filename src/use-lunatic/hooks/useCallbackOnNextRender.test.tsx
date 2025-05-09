import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useCallbackOnNextRender } from './useCallbackOnNextRender.js';
import { act, fireEvent, render } from '@testing-library/react';

describe('useCallbackOnNextRender', () => {
	// Since we want to test when the callback is called, we need to keep track of the count state inside the component
	let countSpy = 0;

	const FakeComponent = (props: { onChange: () => void }) => {
		const onChange = useCallbackOnNextRender(props.onChange);
		const [count, setCount] = useState(0);
		countSpy = count;

		const onClick = () => {
			setCount((v) => v + 1);
			onChange();
		};

		return <button onClick={onClick}>{count}</button>;
	};

	it('should call the callback on the next render', () => {
		let resolveSpy: (e?: unknown) => void;
		const spyPromise = new Promise((resolve) => {
			resolveSpy = resolve;
		});
		const onChange = vi.fn(() => {
			try {
				expect(countSpy).toBe(1);
				resolveSpy();
			} catch (e) {
				resolveSpy(e);
			}
		});
		const { getByRole } = render(<FakeComponent onChange={onChange} />);
		act(() => {
			fireEvent.click(getByRole('button'));
		});

		expect(onChange).toHaveBeenCalledTimes(1);

		return spyPromise.then((r) => {
			if (r instanceof Error) {
				throw r;
			}
			expect(countSpy).toBe(1);
		});
	});
});
