import Declaration from './declaration';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Declaration component', () => {
	it('renders correctly with children prop', () => {
		const { getByText } = render(
			<Declaration type="Test">This is a test declaration.</Declaration>
		);
		const declarationElement = getByText('This is a test declaration.');
		expect(declarationElement).toBeInTheDocument();
		expect(declarationElement).toHaveClass('declaration-lunatic');
		expect(declarationElement).toHaveClass('declaration-test');
	});
	it('renders correctly without children prop', () => {
		const { getByTestId } = render(<Declaration type="Test" />);
		const declarationElement = getByTestId('declaration');
		expect(declarationElement).toBeInTheDocument();
		expect(declarationElement).toHaveClass('declaration-lunatic');
		expect(declarationElement).toHaveClass('declaration-test');
	});
});
