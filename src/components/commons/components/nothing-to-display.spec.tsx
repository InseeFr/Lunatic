import { render } from '@testing-library/react';
import NothingToDisplay from './nothing-to-display';
import { describe, it, expect } from 'vitest';
describe('NothingToDisplay', () => {
	it('renders the legend text', () => {
		const { getByText } = render(<NothingToDisplay />);
		const legendElement = getByText('Nothing to display!');
		expect(legendElement).toBeInTheDocument();
	});
});
