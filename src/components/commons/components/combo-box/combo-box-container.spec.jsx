import React from 'react';
import { render } from '@testing-library/react';
import ComboBoxContainer from './combo-box-container';
import { expect, it, describe } from 'vitest';

describe('ComboBoxContainer', () => {
	it('renders with default styles when no classStyle prop is provided', () => {
		const { container } = render(
			<ComboBoxContainer id="test-id">Content</ComboBoxContainer>
		);
		expect(container.firstChild).toHaveClass('default-style');
	});

	it('renders with additional styles when classStyle prop is provided', () => {
		const { container } = render(
			<ComboBoxContainer id="test-id" classStyle="custom-style">
				Content
			</ComboBoxContainer>
		);
		expect(container.firstChild).toHaveClass('lunatic-combo-box-container');
		expect(container.firstChild).toHaveClass('custom-style');
	});
	it('renders children inside the component', () => {
		const { getByText } = render(
			<ComboBoxContainer id="test-id">Content</ComboBoxContainer>
		);
		expect(getByText('Content')).toBeInTheDocument();
	});

	it('passes className prop to the component', () => {
		const { container } = render(
			<ComboBoxContainer id="test-id" className="test-class">
				Content
			</ComboBoxContainer>
		);
		expect(container.firstChild).toHaveClass('test-class');
	});
});
