import { render } from '@testing-library/react';
import { Fieldset } from './Fieldset';
import { describe, it, expect } from 'vitest';
describe('Fieldset', () => {
	it('renders the legend text', () => {
		const legendText = 'Example Legend';
		const { getByText } = render(<Fieldset legend={legendText} />);
		const legendElement = getByText(legendText);
		expect(legendElement).toBeInTheDocument();
	});

	it('renders the children', () => {
		const childText = 'Example child text';
		const { getByText } = render(
			<Fieldset>
				<div>{childText}</div>
			</Fieldset>
		);
		const childElement = getByText(childText);
		expect(childElement).toBeInTheDocument();
	});
	it('applies the className', () => {
		const className = 'custom-class';
		const { container } = render(<Fieldset className={className} />);
		const fieldsetElement = container.querySelector('fieldset');
		expect(fieldsetElement).toHaveClass(className);
	});
});
