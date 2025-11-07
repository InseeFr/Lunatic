import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { findFirstFocusableElement } from './focus';

describe('findFirstFocusableElement', () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.removeChild(container);
	});

	describe('prioritizes invalid fields', () => {
		it('should focus invalid input over valid input', () => {
			container.innerHTML = `
                <input id="valid-input" />
                <input id="invalid-input" aria-invalid="true" />
            `;

			const result = findFirstFocusableElement(container);
			expect(result?.id).toBe('invalid-input');
		});

		it('should focus invalid textarea over valid textarea', () => {
			container.innerHTML = `
                <textarea id="valid-textarea"></textarea>
                <textarea id="invalid-textarea" aria-invalid="true"></textarea>
            `;

			const result = findFirstFocusableElement(container);
			expect(result?.id).toBe('invalid-textarea');
		});

		it('should focus first input when no invalid elements exist', () => {
			container.innerHTML = `
                <input id="input-1" />
                <input id="input-2" />
            `;

			const result = findFirstFocusableElement(container);
			expect(result?.id).toBe('input-1');
		});

		it('should focus first button when no invalid elements exist', () => {
			container.innerHTML = `
                <button id="button-1">Button 1</button>
                <button id="button-2">Button 2</button>
            `;

			const result = findFirstFocusableElement(container);
			expect(result?.id).toBe('button-1');
		});

		it('should ignore elements with tabindex="-1"', () => {
			container.innerHTML = `
                <div tabindex="-1" id="negative-tabindex">Not focusable</div>
                <input id="focusable-input" />
            `;

			const result = findFirstFocusableElement(container);
			expect(result?.id).toBe('focusable-input');
		});
	});
});
