import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loop } from './Loop';
import type { LunaticComponentProps } from '../type';

describe('Loop', () => {
    const mockOnChange = vi.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    const getComponents = (iteration: number) => [
        {
            componentType: 'Input',
            maxLength: 249,
            id: 'nameId',
            response: {
                name: 'name',
            },
            iteration: iteration,
            value: 'Jonathan Doe',
        } as LunaticComponentProps<'Input'>,
    ];

    it('render the right number of lines by default', () => {
        render(
            <Loop
                value={{ name: ['John Doe', 'Jane Doe'] }}
                handleChanges={mockOnChange}
                label="Ceci est un test"
                id="table"
                lines={{ min: 4, max: 10 }}
                iterations={2}
                getComponents={getComponents}
                executeExpression={() => null as any}
            />
        );
        expect(screen.getAllByRole('textbox')).toHaveLength(4);
    });

    it('disables the remove row button when the minimum number of rows is reached', () => {
        render(
            <Loop
                value={{ name: ['John Doe', 'Jane Doe', 'Alice', 'Bob'] }}
                handleChanges={mockOnChange}
                label="Ceci est un test"
                id="table"
                lines={{ min: 4, max: 10 }}
                iterations={4}
                getComponents={getComponents}
                executeExpression={() => null as any}
            />
        );

        const Button = screen.getByRole('button', { name: /remove/i });
        expect(Button).toBeDisabled();
    });

    it('enables the add row button when the maximum number of rows is not reached', () => {
        render(
            <Loop
                value={{ name: ['John Doe', 'Jane Doe', 'Alice'] }}
                handleChanges={mockOnChange}
                label="Ceci est un test"
                id="table"
                lines={{ min: 2, max: 10 }}
                iterations={3}
                getComponents={getComponents}
                executeExpression={() => null as any}
            />
        );

        const Button = screen.getByRole('button', { name: /add/i });
        expect(Button).not.toBeDisabled();
    });
});
