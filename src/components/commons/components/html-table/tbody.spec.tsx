import { render } from '@testing-library/react';
import { LunaticTbody as Tbody } from './tbody';
import { expect, describe, it } from 'vitest';

describe('Tbody component', () => {
	it('renders the component with the correct props and children', () => {
		const testId = 'test-id';
		const testClass = 'test-class';
		const testContent = 'Test content';
		const { getByRole, getByText } = render(
			<Tbody id={testId} className={testClass}>
				{testContent}
			</Tbody>
		);
		const tbodyElement = getByRole('rowgroup');
		expect(tbodyElement).toHaveAttribute('id', `lunatic-table-tbody-${testId}`);
		expect(tbodyElement).toHaveClass('lunatic-table-tbody');
		expect(tbodyElement).toHaveClass(testClass);
		expect(getByText(testContent)).toBeInTheDocument();
	});

	it('renders the component without an ID or class when not provided', () => {
		const { getByRole } = render(<Tbody />);
		const tbodyElement = getByRole('rowgroup');
		expect(tbodyElement).not.toHaveAttribute('id');
		expect(tbodyElement).toHaveClass('lunatic-table-tbody');
	});
});
