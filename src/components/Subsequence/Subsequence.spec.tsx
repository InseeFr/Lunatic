import { render } from '@testing-library/react';
import { Subsequence } from './Subsequence';
import { describe, it, expect } from 'vitest';
describe('Sequence', () => {
	const mockDeclarations = [
		{
			id: '1',
			label: 'Declaration 1',
			declarationType: 'TYPE_1',
			position: 'AFTER_QUESTION_TEXT',
		},
	];
	const mockProps = {
		declarations: mockDeclarations,
		id: 'test-subsequence',
		label: 'Test Subsequence Label',
		style: { backgroundColor: 'red' },
	};

	it('renders the label and declarations in the correct order', () => {
		const { getByText, queryByText } = render(<Subsequence {...mockProps} />);
		const subSequenceLabel = getByText('Test Subsequence Label');
		const declaration1 = getByText('Declaration 1');

		// Declarations before text should appear before the label
		expect(declaration1).toBeInTheDocument();
		expect(subSequenceLabel.nextSibling?.childNodes[0]).toBe(declaration1);

		// Ensure no other declarations are rendered
		expect(queryByText('Declaration 2')).toBeNull();
	});

	it('applies the correct aria-label', () => {
		const { getByText } = render(<Subsequence {...mockProps} />);
		const subSequenceLabel = getByText('Test Subsequence Label');
		expect(subSequenceLabel).toHaveAttribute(
			'aria-label',
			'subsequence-test-subsequence'
		);
	});

	it('does not render declarations if none are provided', () => {
		const { queryByText } = render(
			<Subsequence id="empty-subsequence" label="Empty Sequence" />
		);
		expect(queryByText('Declaration 1')).toBeNull();
		expect(queryByText('Declaration 2')).toBeNull();
		expect(queryByText('Declaration 3')).toBeNull();
	});
});
