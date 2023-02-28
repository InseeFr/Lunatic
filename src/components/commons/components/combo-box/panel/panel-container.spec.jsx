import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PanelContainer from './panel-container';

describe('PanelContainer', () => {
	it('should render children', () => {
		render(
			<PanelContainer>
				<li>Item 1</li>
				<li>Item 2</li>
			</PanelContainer>
		);
		const items = screen.getAllByRole('listitem');
		expect(items).toHaveLength(2);
		expect(items[0]).toHaveTextContent('Item 1');
		expect(items[1]).toHaveTextContent('Item 2');
	});

	it('should set the id attribute', () => {
		const id = 'test-panel';
		render(
			<PanelContainer id={id}>
				<li>Item 1</li>
			</PanelContainer>
		);
		expect(screen.getByRole('listbox')).toHaveAttribute(
			'id',
			`lunatic-combo-box-panel-${id}`
		);
	});

	it('should set the aria-label attribute', () => {
		render(
			<PanelContainer>
				<li>Item 1</li>
			</PanelContainer>
		);
		expect(screen.getByRole('listbox')).toHaveAttribute(
			'aria-label',
			'suggestions'
		);
	});

	it('should set the focused class when focused prop is true', () => {
		render(
			<PanelContainer focused>
				<li>Item 1</li>
			</PanelContainer>
		);
		expect(screen.getByRole('listbox')).toHaveClass('focused');
	});

	it('should set the expended class when expended prop is true', () => {
		render(
			<PanelContainer expended>
				<li>Item 1</li>
			</PanelContainer>
		);
		expect(screen.getByRole('listbox')).toHaveClass('expended');
	});
});
