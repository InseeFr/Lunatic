import React from 'react';
import { render } from '@testing-library/react';
import SelectionContainer from './selection-container';
import { expect, describe, it } from 'vitest';

describe('SelectionContainer', () => {
	it('renders with default props', () => {
		const { container } = render(
			<SelectionContainer>Content</SelectionContainer>
		);
		const divElement = container.querySelector('div');

		expect(divElement).toBeInTheDocument();
		expect(divElement).toHaveClass('lunatic-combo-box-selection');
		expect(divElement).not.toHaveClass('focused');
		expect(divElement).not.toHaveClass('disabled');
		expect(divElement).toHaveAttribute('id', 'idUndefined');
		expect(divElement).toHaveAttribute('role', 'combobox');
		expect(divElement).toHaveAttribute('aria-controls', 'todo');
		expect(divElement).toHaveAttribute('aria-haspopup', 'listbox');
		expect(divElement).not.toHaveAttribute('aria-expanded');
		expect(divElement).toHaveAttribute('aria-autocomplete', 'list');
		expect(divElement).toHaveAttribute('aria-owns', 'idUndefined');
		expect(divElement).not.toHaveAttribute('aria-labelledby');
	});

	it('renders with custom props', () => {
		const { container } = render(
			<SelectionContainer
				id="myComboBox"
				expended={true}
				focused={true}
				disabled={true}
				labelId="myLabel"
			>
				Content
			</SelectionContainer>
		);
		const divElement = container.querySelector('div');

		expect(divElement).toBeInTheDocument();
		expect(divElement).toHaveClass('lunatic-combo-box-selection');
		expect(divElement).toHaveClass('focused');
		expect(divElement).toHaveClass('disabled');
		expect(divElement).toHaveAttribute('id', 'myComboBox');
		expect(divElement).toHaveAttribute('role', 'combobox');
		expect(divElement).toHaveAttribute('aria-controls', 'todo');
		expect(divElement).toHaveAttribute('aria-haspopup', 'listbox');
		expect(divElement).toHaveAttribute('aria-expanded', 'true');
		expect(divElement).toHaveAttribute('aria-autocomplete', 'list');
		expect(divElement).toHaveAttribute('aria-owns', 'myComboBox');
		expect(divElement).toHaveAttribute('aria-labelledby', 'myLabel');
	});
});
