import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ComboboxPanelContainer } from './ComboboxPanelContainer';

describe('ComboboxPanelContainer', () => {
	it('should render children', () => {
		render(
			<ComboboxPanelContainer>
				<li>Item 1</li>
				<li>Item 2</li>
			</ComboboxPanelContainer>
		);
		const items = screen.getAllByRole('listitem');
		expect(items).toHaveLength(2);
		expect(items[0]).toHaveTextContent('Item 1');
		expect(items[1]).toHaveTextContent('Item 2');
	});

	it('should set the id attribute', () => {
		const id = 'test-panel';
		render(
			<ComboboxPanelContainer id={id}>
				<li>Item 1</li>
			</ComboboxPanelContainer>
		);
		expect(screen.getByRole('listbox')).toHaveAttribute(
			'id',
			`lunatic-combo-box-panel-${id}`
		);
	});

	it('should set the aria-label attribute', () => {
		render(
			<ComboboxPanelContainer>
				<li>Item 1</li>
			</ComboboxPanelContainer>
		);
		expect(screen.getByRole('listbox')).toHaveAttribute(
			'aria-label',
			'suggestions'
		);
	});

	it('should set the focused class when focused prop is true', () => {
		render(
			<ComboboxPanelContainer focused>
				<li>Item 1</li>
			</ComboboxPanelContainer>
		);
		expect(screen.getByRole('listbox')).toHaveClass('focused');
	});

	it('should set the expanded class when expanded prop is true', () => {
		render(
			<ComboboxPanelContainer expanded>
				<li>Item 1</li>
			</ComboboxPanelContainer>
		);
		expect(screen.getByRole('listbox')).toHaveClass('expanded');
	});
});
