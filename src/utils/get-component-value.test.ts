import { describe, expect, it } from 'vitest';
import { getComponentValue } from './get-component-value';

describe('getComponentValue', () => {
	const componentWithResponse = {
		response: { name: 'prenom' },
	};
	const componentWithResponses = {
		responses: [componentWithResponse, { response: { name: 'nom' } }],
	};
	it('Should work with simple response', () => {
		expect(getComponentValue(componentWithResponse, { prenom: 'John' })).toBe(
			'John'
		);
		expect(getComponentValue(componentWithResponse, {})).toBe(undefined);
		expect(getComponentValue({}, { prenom: 'John' })).toBe(undefined);
	});

	it('Should work with simple response as Array', () => {
		expect(
			getComponentValue(
				componentWithResponse,
				{ prenom: ['John', 'Renaud'] },
				1
			)
		).toBe('Renaud');
		expect(
			getComponentValue(
				componentWithResponse,
				{ prenom: ['John', 'Renaud'] },
				3
			)
		).toBe(undefined);
	});

	it('Should work with responses', () => {
		expect(
			getComponentValue(componentWithResponses, { prenom: 'John' })
		).toMatchObject({ prenom: 'John', nom: undefined });

		expect(
			getComponentValue(
				componentWithResponses,
				{ prenom: ['John', 'Renaud'], nom: ['Insee', 'Metallica'] },
				1
			)
		).toMatchObject({ prenom: 'Renaud', nom: 'Metallica' });

		expect(
			getComponentValue(
				componentWithResponses,
				{ prenom: ['John', 'Renaud'], nom: 'Insee' },
				1
			)
		).toMatchObject({ prenom: 'Renaud', nom: 'Insee' });
	});
});
