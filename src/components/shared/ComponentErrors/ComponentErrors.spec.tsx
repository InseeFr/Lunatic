import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ComponentErrors } from './ComponentErrors';
import type { LunaticError } from '../../../use-lunatic/type';

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
			<ComponentErrors errors={errors} componentId="id3" />
		);
		expect(container.firstChild).toBeNull();
	});

	it('renders active errors', () => {
		const { getByText } = render(
			<ComponentErrors errors={errors} componentId="id2" />
		);
		expect(getByText('Error 2 message')).toBeInTheDocument();
		expect(getByText('Error 3 message')).toBeInTheDocument();
	});
});
