import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RosterForLoop } from './roster-for-loop';
import type { FilledLunaticComponentProps } from '../../../use-lunatic/commons/fill-components/fill-components';

describe('RosterForLoop', () => {
	const mockOnChange = vi.fn();

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	const getComponents = (iteration: number) => [
		{
			componentType: 'Input',
			maxLength: 249,
			id: 'jrc3ye5q-QOP-lo6tcvvx',
			response: {
				name: 'TABDYN1',
			},
			iteration: iteration,
			value: 'azeaze',
		} as FilledLunaticComponentProps,
	];

	it('renders the right number of columns', () => {
		const { container } = render(
			<RosterForLoop
				value={{ name: ['John Doe', 'Jane Doe'] }}
				handleChange={mockOnChange}
				label="Ceci est un test"
				id="table"
				lines={{ min: 1, max: 3 }}
				iterations={2}
				getComponents={getComponents}
				executeExpression={() => null as any}
			/>
		);
		expect(container).toMatchSnapshot();
		expect(screen.getAllByRole('row')).toHaveLength(2);
	});
});
