import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Description from './description';

describe('Description', () => {
	const testArray = [
		{ label: 'test label 1', declarationType: 'test-type-1' },
		{ label: 'test label 2', declarationType: 'test-type-2' },
	];
	it('renders null when no props are passed', () => {
		const { container } = render(<Description />);
		expect(container.firstChild).toBeNull();
	});

	it('renders an array of OneDescription components when value prop is an array', () => {
		const { getByText } = render(<Description value={testArray} />);
		expect(getByText('test label 1')).toBeInTheDocument();
		expect(getByText('test label 2')).toBeInTheDocument();
		expect(getByText('test label 1')).toHaveClass('test-type-1');
		expect(getByText('test label 2')).toHaveClass('test-type-2');
	});

	it('adds className prop to rendered span element', () => {
		const { container } = render(
			<Description value={testArray} className="test-class" />
		);
		expect(container.firstChild).toHaveClass('label-description', 'test-class');
	});
	it('sets default props correctly', () => {
		const defaultProps = Description.defaultProps;
		expect(defaultProps.value).toBeUndefined();
		expect(defaultProps.className).toBeUndefined();
	});
});
