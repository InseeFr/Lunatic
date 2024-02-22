import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Errors, { getComponentErrors } from './errors';
import type { LunaticError } from '../../../../use-lunatic/type';

describe('Errors component', () => {
	const errors = {
		id1: [
			{
				id: 'error1',
				errorMessage: 'Error 1 message',
				criticality: 'ERROR',
				typeOfControl: 'CONSISTENCY',
			},
		],
		id2: [
			{
				id: 'error2',
				errorMessage: 'Error 2 message',
				criticality: 'ERROR',
				typeOfControl: 'CONSISTENCY',
			},
			{
				id: 'error3',
				errorMessage: 'Error 3 message',
				criticality: 'ERROR',
				typeOfControl: 'CONSISTENCY',
			},
		],
	} satisfies Record<string, LunaticError[]>;

	it('renders null when no active errors', () => {
		const { container } = render(
			<Errors errors={getComponentErrors(errors, 'id3')} />
		);
		expect(container.firstChild).toBeNull();
	});

	it('renders active errors', () => {
		const { getByText } = render(
			<Errors errors={getComponentErrors(errors, 'id2')} />
		);
		expect(getByText('Error 2 message')).toBeInTheDocument();
		expect(getByText('Error 3 message')).toBeInTheDocument();
	});
});
