import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RosterForLoop } from './RosterForLoop';
import type { LunaticComponentProps } from '../type';
import { LunaticContext } from '../../use-lunatic/lunatic-context';

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
		} as LunaticComponentProps<'Input'>,
	];

	it('renders the right number of columns', () => {
		const { container } = render(
			<RosterForLoop
				value={{ name: ['John Doe', 'Jane Doe'] }}
				handleChanges={mockOnChange}
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
		expect(screen.getByRole('button', { name: /add/i })).toBeEnabled();
		expect(screen.getByRole('button', { name: /remove/i })).toBeEnabled();
	});

	it('disable the remove row button', () => {
		const { container } = render(
			<LunaticContext.Provider
				value={{
					componentsOptions: { disableRosterForLoopDeleteRowButton: true },
				}}
			>
				<RosterForLoop
					value={{ name: ['John Doe', 'Jane Doe'] }}
					handleChanges={mockOnChange}
					label="Ceci est un test"
					id="table"
					lines={{ min: 1, max: 3 }}
					iterations={2}
					getComponents={getComponents}
					executeExpression={() => null as any}
				/>
			</LunaticContext.Provider>
		);
		expect(container).toMatchSnapshot();
		expect(screen.getAllByRole('row')).toHaveLength(2);
		expect(screen.getByRole('button', { name: /add/i })).toBeEnabled();
		expect(screen.getByRole('button', { name: /remove/i })).toBeDisabled();
	});
});
