import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LunaticButton as Button } from './lunatic-button';
import { describe, vi, it, expect } from 'vitest';

describe('Button', () => {
	it('renders without crashing', () => {
		const container = render(
			<Button onClick={() => {}}>
				<span>Click me!</span>
			</Button>
		);
		expect(container).toMatchSnapshot();
	});
	it('renders a button element with given children as a Span', () => {
		const { getByRole } = render(
			<Button onClick={() => {}}>
				<span>Click me!</span>
			</Button>
		);
		const button = getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.tagName).toBe('BUTTON');
		expect(button).toHaveTextContent('Click me!');
	});
	it('renders a button element with given children if children is not a React element', () => {
		const label = 'Click me!';
		const { getByDisplayValue } = render(
			<Button onClick={() => {}}>{label}</Button>
		);
		const input = getByDisplayValue(label);
		expect(input).toBeInTheDocument();
		expect(input.tagName).toBe('INPUT');
		expect(input).toHaveAttribute('value', label);
	});

	it('appelle onClick quand le bouton est cliqué', () => {
		const handleClick = vi.fn();
		const { getByText } = render(
			<Button onClick={handleClick}>Cliquez ici</Button>
		);
		const buttonElement = getByText('Cliquez ici');
		fireEvent.click(buttonElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('renders an input element with given label without a child', () => {
		const label = 'Click me!';
		const { getByDisplayValue } = render(
			<Button onClick={() => {}} label={label} />
		);
		const input = getByDisplayValue(label);
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('type', 'button');
		expect(input).toHaveAttribute('value', label);
	});

	it('applique la classe disabled lorsque la prop disabled est true', () => {
		const { getByText } = render(
			<Button onClick={() => {}} disabled={true}>
				Cliquez ici
			</Button>
		);
		const buttonElement = getByText('Cliquez ici');
		expect(buttonElement).toHaveClass('disabled');
	});
	it('applies the provided className to the button element', () => {
		const { getByRole } = render(
			<Button onClick={() => {}} className="test-class">
				Click me!
			</Button>
		);
		const button = getByRole('button');
		expect(button).toHaveClass('test-class');
	});
});
