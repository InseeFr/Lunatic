import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Errors, { getComponentErrors } from './errors';
import type { LunaticError } from '../../../../use-lunatic/type';
import {
	Criticality,
	TypeOfControl,
} from '../../../../use-lunatic/type-source';

describe('Errors component', () => {
	const errors = {
		id1: [
			{
				id: 'error1',
				errorMessage: 'Error 1 message',
				criticality: Criticality.ERROR,
				typeOfControl: TypeOfControl.CONSISTENCY,
			},
		],
		id2: [
			{
				id: 'error2',
				errorMessage: 'Error 2 message',
				criticality: Criticality.ERROR,
				typeOfControl: TypeOfControl.CONSISTENCY,
			},
			{
				id: 'error3',
				errorMessage: 'Error 3 message',
				criticality: Criticality.ERROR,
				typeOfControl: TypeOfControl.CONSISTENCY,
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
