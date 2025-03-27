import { afterEach, describe, expect, it, vi } from 'vitest';
import { Duration } from './Duration';
import { render } from '@testing-library/react';
import { DurationFormat } from '../type';

describe('Duration', () => {
	const mockOnChange = vi.fn();

	const baseDeclarations = [
		{
			id: '1',
			label: 'Declaration 1',
			declarationType: 'COMMENT' as const,
			position: 'AFTER_QUESTION_TEXT',
		},
		{
			id: '2',
			label: 'Declaration 2',
			declarationType: 'COMMENT' as const,
			position: 'AFTER_QUESTION_TEXT',
		},
	];

	const baseProps = {
		handleChanges: mockOnChange,
		response: { name: 'demo' },
		format: 'PTnHnM' as DurationFormat,
		value: 'PT5H1M',
		id: 'duration',
		label: 'label',
		description: 'description',
		declarations: baseDeclarations,
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders label, declarations and description', () => {
		const { getByText } = render(<Duration {...baseProps} />);

		// label is displayed
		expect(getByText(baseProps.label)).toBeInTheDocument();

		// all declarations are displayed
		expect(getByText('Declaration 1')).toBeInTheDocument();
		expect(getByText('Declaration 2')).toBeInTheDocument();

		// description is displayed
		expect(getByText(baseProps.description)).toBeInTheDocument();
	});
});
