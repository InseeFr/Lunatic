import { describe, expect, it } from 'vitest';
import { getInitialVariableValue } from './variables';
import type { LunaticData, LunaticVariable } from '../use-lunatic/type';

const data = {
	EXTERNAL: {
		ADRESSE: 'mon adresse',
	},
	CALCULATED: {
		PRENOMSB: ['Paul', 'Pierre'],
	},
	COLLECTED: {
		NB_HAB: {
			COLLECTED: 2,
		},
		PRENOMS: {
			COLLECTED: ['Paul', 'Pierre'],
			EDITED: [],
			INPUTED: [],
			FORCED: [],
			PREVIOUS: [],
		},
		AGE: {},
	},
} as any as LunaticData;

const externalVariable = {
	variableType: 'EXTERNAL',
	name: 'ADRESSE',
} as LunaticVariable;

const calculatedVariable = {
	variableType: 'CALCULATED',
	bindingDependencies: ['PRENOMS'],
	expression: {
		type: 'VTL',
		value: 'PRENOMS',
	},
	name: 'PRENOMSB',
	shapeFrom: 'PRENOMS',
} as LunaticVariable;

const simpleCollectedVariable = {
	variableType: 'COLLECTED',
	name: 'NB_HAB',
} as LunaticVariable;

const loopCollectedVariable = {
	variableType: 'COLLECTED',
	values: {
		COLLECTED: [],
	},
	name: 'PRENOMS',
} as LunaticVariable;

const emptyCollectedVariable = {
	variableType: 'COLLECTED',
	name: 'AGE',
} as LunaticVariable;

describe('getInitialVariableValue', () => {
	it('should return external value', () => {
		expect(getInitialVariableValue(externalVariable, data)).toEqual(
			'mon adresse'
		);
	});
	it('should return calculated value', () => {
		expect(getInitialVariableValue(calculatedVariable, data)).toEqual([
			'Paul',
			'Pierre',
		]);
	});
	it('should return collected value out of a loop', () => {
		expect(getInitialVariableValue(simpleCollectedVariable, data)).toEqual(2);
	});
	it('should return array of collected values in a loop', () => {
		expect(getInitialVariableValue(loopCollectedVariable, data)).toEqual([
			'Paul',
			'Pierre',
		]);
	});
	it('should return undefined value out of a loop', () => {
		expect(getInitialVariableValue(emptyCollectedVariable, data)).toEqual(
			undefined
		);
	});
	it('should set empty undefined if no data', () => {
		expect(getInitialVariableValue(simpleCollectedVariable)).toEqual(undefined);
	});
});
