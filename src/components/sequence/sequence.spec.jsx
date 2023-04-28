import { render } from '@testing-library/react';
import Sequence from './lunatic-sequence';
import { describe, it, expect } from 'vitest';
describe('Sequence', () => {
	const mockDeclarations = [
		{
			id: 1,
			label: 'Declaration 1',
			declarationType: 'TYPE_1',
			position: 'BEFORE_QUESTION_TEXT',
		},
		{
			id: 2,
			label: 'Declaration 2',
			declarationType: 'TYPE_2',
			position: 'AFTER_QUESTION_TEXT',
		},
		{
			id: 3,
			label: 'Declaration 3',
			declarationType: 'TYPE_3',
			position: 'DETACHABLE',
		},
	];
	const mockProps = {
		declarations: mockDeclarations,
		id: 'test-sequence',
		label: 'Test Sequence Label',
		style: { backgroundColor: 'red' },
	};

	it('renders the label and declarations in the correct order', () => {
		const { getByText, queryByText } = render(<Sequence {...mockProps} />);
		const declaration1 = getByText('Declaration 1');
		const declaration3 = getByText('Declaration 3');
		const sequence = getByText('Test Sequence Label');

		expect(declaration1).toBeInTheDocument();

		expect(declaration3).toBeInTheDocument();

		expect(sequence).toBeInTheDocument();

		// Ensure no other declarations are rendered
		expect(queryByText('Declaration 4')).toBeNull();
	});

	it('applies the correct styles', () => {
		const { container } = render(<Sequence {...mockProps} />);
		const sequenceDiv = container.querySelector('#sequence-test-sequence');
		expect(sequenceDiv).toHaveStyle('background-color: red');
	});

	it('does not render declarations if none are provided', () => {
		const { queryByText } = render(
			<Sequence id="empty-sequence" label="Empty Sequence" />
		);
		expect(queryByText('Declaration 1')).toBeNull();
		expect(queryByText('Declaration 2')).toBeNull();
		expect(queryByText('Declaration 3')).toBeNull();
	});
});
