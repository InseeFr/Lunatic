import { describe, it, expect } from 'vitest';
import reduceVariablesArray from './reduce-variables-array';
import { LunaticStateVariable } from '../../type';
import { generateData } from '../../../../tests/helpers';

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
			maxIteration: [5],
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
			maxIteration: [5, 2],
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

	it('should update deep iteration', function () {
		const newVars = reduceVariablesArray(variables, {
			name: 'PRENOM',
			value: 'Marc',
			iteration: [4, 1],
			maxIteration: [5, 2],
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

	it('should update deep iteration', function () {
		const newVars = reduceVariablesArray(
			{
				PRENOM: {
					type: 'COLLECTED',
					value: [null, ['John', 'Jane']],
				} as LunaticStateVariable,
			},
			{
				name: 'PRENOM',
				value: ['Marc'],
				iteration: [0],
				maxIteration: [1],
			}
		);
		expect(newVars.PRENOM.value).toEqual([['Marc'], ['John', 'Jane']]);
	});
});
