import createExecuteExpression from './create-execute-expression';
import { describe, beforeEach, it, expect } from 'vitest';

const variables = {
	LASTNAME: {
		CalculatedLinked: [],
		type: 'COLLECTED',
		value: 'Doe',
		variable: {
			name: 'LASTNAME',
			variableType: 'COLLECTED',
		},
	},
	GREETING: {
		CalculatedLinked: [],
		value: 'Hello Doe',
		type: 'CALCULATED',
		variable: {
			name: 'GREETING',
			variableType: 'COLLECTED',
			expression: { value: '"Hello " || LASTNAME', type: 'VTL' },
		},
	},
	PAIRWISE: {
		CalculatedLinked: [],
		type: 'COLLECTED',
		value: [
			['a1', 'a2'],
			['b1', 'b2'],
		],
		variable: {
			name: 'PAIRWISE',
			variableType: 'COLLECTED',
		},
	},
	PRENOMS: {
		CalculatedLinked: [],
		type: 'COLLECTED',
		value: [],
		variable: {
			name: 'PRENOMS',
			variableType: 'COLLECTED',
		},
	},
	PRENOMVIDE: {
		CalculatedLinked: [],
		type: 'CALCULATED',
		variable: {
			name: 'PRENOMVIDE',
			variableType: 'CALCULATED',
			expression: { value: '"empty"', type: 'VTL' },
		},
	},
	PRENOMS_WITH_DEFAULTS: {
		CalculatedLinked: [],
		variable: {
			variableType: 'CALCULATED',
			name: 'PRENOMS_WITH_DEFAULTS',
			expression: {
				value: 'if (isnull(PRENOMS)) then PRENOMVIDE else PRENOMS',
				type: 'VTL',
			},
			bindingDependencies: ['PRENOMS', 'PRENOMVIDE'],
			shapeFrom: 'PRENOMS',
		},
		type: 'CALCULATED',
	},
	PRENOMS_SIZE: {
		CalculatedLinked: [],
		variable: {
			variableType: 'CALCULATED',
			name: 'PRENOMS_SIZE',
			expression: {
				value: 'count(PRENOMS)',
				type: 'VTL',
			},
			bindingDependencies: ['PRENOMS'],
		},
		type: 'CALCULATED',
	},
};
variables.PRENOMS.CalculatedLinked = [
	variables.PRENOMS_WITH_DEFAULTS.variable,
	variables.PRENOMS_SIZE.variable,
];
variables.LASTNAME.CalculatedLinked = [variables.GREETING.variable];

describe('createExecuteExpression', function () {
	let execute, update;

	beforeEach(() => {
		[execute, update] = createExecuteExpression(variables, ['VTL', 'VTL|MD']);
	});

	it('should retrieve collected value', () => {
		expect(execute('LASTNAME')).toBe('Doe');
		expect(execute('"John " || LASTNAME')).toBe('John Doe');
	});

	it('should hangle calculated value', () => {
		expect(execute('GREETING')).toBe('Hello Doe');
		update('LASTNAME', 'Doee');
		expect(execute('GREETING')).toBe('Hello Doee');
	});

	it('should handle updated value', () => {
		expect(execute('LASTNAME')).toBe('Doe');
		update('LASTNAME', 'John');
		expect(execute('LASTNAME')).toBe('John');
	});

	it('should handle 1D vectors', () => {
		update('PRENOMS', ['Jane', 'John', 'James']);
		expect(execute('PRENOMS', { iteration: 1 })).toBe('John');
		expect(execute('PRENOMS', { iteration: 0 })).toBe('Jane');
		expect(execute('PRENOMS_SIZE', { iteration: 1 })).toBe(3);
		expect(execute('PRENOMS_WITH_DEFAULTS', { iteration: 1 })).toBe('John');
		update('PRENOMS', [null, null]);
		expect(execute('PRENOMS', { iteration: 1 })).toBe(null);
		expect(execute('PRENOMS_WITH_DEFAULTS', { iteration: 1 })).toBe('empty');
		expect(execute('PRENOMS_SIZE')).toBe(2);
	});

	it('should handle 2D Vectors', () => {
		expect(execute('PAIRWISE', { linksIterations: [0, 1] })).toBe('a2');
		expect(execute('PAIRWISE', { linksIterations: [1, 1] })).toBe('b2');
	});

	it('should handle direct expression', () => {
		update('PRENOMS', ['Jane', 'John', 'James']);
		expect(execute('count(PRENOMS)')).toBe(3);
		expect(execute('PRENOMS || " Doe"', { iteration: 0 })).toBe('Jane Doe');
	});
});
