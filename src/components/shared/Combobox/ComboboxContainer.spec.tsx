import { render } from '@testing-library/react';
import { ComboboxContainer } from './ComboboxContainer';
import { expect, it, describe } from 'vitest';

describe('ComboBoxContainer', () => {
	it('renders with default styles when no classStyle prop is provided', () => {
		const { container } = render(
			<ComboboxContainer id="test-id">Content</ComboboxContainer>
		);
		expect(container.firstChild).toHaveClass('default-style');
	});

	it('renders with additional styles when classStyle prop is provided', () => {
		const { container } = render(
			<ComboboxContainer id="test-id" classStyle="custom-style">
				Content
			</ComboboxContainer>
		);
		expect(container.firstChild).toHaveClass('lunatic-combo-box-container');
		expect(container.firstChild).toHaveClass('custom-style');
	});
	it('renders children inside the component', () => {
		const { getByText } = render(
			<ComboboxContainer id="test-id">Content</ComboboxContainer>
		);
		expect(getByText('Content')).toBeInTheDocument();
	});

	it('passes className prop to the component', () => {
		const { container } = render(
			<ComboboxContainer id="test-id" className="test-class">
				Content
			</ComboboxContainer>
		);
		expect(container.firstChild).toHaveClass('test-class');
	});
});
