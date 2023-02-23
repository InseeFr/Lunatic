import { describe, it, expect } from 'vitest';
import reduceVariablesArray from './reduce-variables-array';
import { LunaticStateVariable } from '../../type';

describe('reduceVariablesArray', () => {
	const variables = {
		PRENOM: {
			type: 'COLLECTED',
			value: ['John', 'Jane'],
		} as LunaticStateVariable,
	};

	it('should handle simple iteration', function () {
		const newVars = reduceVariablesArray(variables, {
			name: 'PRENOM',
			value: 'Marc',
			iteration: [4],
			maxIteration: [6],
		});
		expect(newVars.PRENOM.value).toEqual([
			'John',
			'Jane',
			undefined,
			undefined,
			'Marc',
			undefined,
		]);
	});

	it('should update deep iteration', function () {
		const newVars = reduceVariablesArray(variables, {
			name: 'PRENOM',
			value: 'Marc',
			iteration: [4, 1],
			maxIteration: [6, 3],
		});
		expect(newVars.PRENOM.value).toEqual([
			'John',
			'Jane',
			undefined,
			undefined,
			[undefined, 'Marc', undefined],
			undefined,
		]);
	});
});
