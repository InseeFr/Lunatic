import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Dragger from './dragger';

describe('Dragger', () => {
	let el, onDrag;

	beforeEach(() => {
		el = {
			getBoundingClientRect: vi.fn(() => ({ top: 0, left: 0 })),
			style: {},
		};
		onDrag = vi.fn();
	});

	it('renders without crashing', () => {
		const { getByTestId } = render(<Dragger el={el} />);
		expect(getByTestId('lunatic-dragger')).toBeInTheDocument();
	});

	it('sets the drag state to true and calls the onDrag function with true when the mouse button is pressed', () => {
		const { getByTestId } = render(<Dragger el={el} onDrag={onDrag} />);
		const dragger = getByTestId('lunatic-dragger');

		fireEvent.mouseDown(dragger);

		expect(onDrag).toHaveBeenCalledWith(true, [
			expect.any(Number),
			expect.any(Number),
		]);
	});

	it('sets the drag state to false and calls the onDrag function with false when the mouse button is released', () => {
		const { getByTestId } = render(<Dragger el={el} onDrag={onDrag} />);
		const dragger = getByTestId('lunatic-dragger');

		fireEvent.mouseDown(dragger);
		fireEvent.mouseUp(dragger);

		expect(onDrag).toHaveBeenCalledWith(false);
	});

	it('calls the onMouseMove function and updates the delta state when the mouse is moved', () => {
		const { getByTestId } = render(<Dragger el={el} onDrag={onDrag} />);
		const dragger = getByTestId('lunatic-dragger');

		fireEvent.mouseDown(dragger);
		fireEvent.mouseMove(dragger, { clientX: 10, clientY: 10 });

		expect(onDrag).toHaveBeenCalledWith(true, [10, 10]);
	});

	it('updates the el style top and left properties when the delta state is updated', () => {
		const { getByTestId } = render(<Dragger el={el} onDrag={onDrag} />);
		const dragger = getByTestId('lunatic-dragger');

		fireEvent.mouseDown(dragger);
		fireEvent.mouseMove(dragger, { clientX: 10, clientY: 10 });

		expect(el.style.top).toBe('10px');
		expect(el.style.left).toBe('10px');
	});
});
