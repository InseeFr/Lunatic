import { describe, it, beforeEach, expect } from 'vitest';
import { LunaticVariablesStore } from './lunatic-variables-store';
import { resizingBehaviour } from './behaviours/resizing-behaviour';
import { cleaningBehaviour } from './behaviours/cleaning-behaviour';
import { missingBehaviour } from './behaviours/missing-behaviour';

describe('lunatic-variables-store', () => {
	let variables: LunaticVariablesStore;

	beforeEach(() => {
		variables = new LunaticVariablesStore();
	});

	it('should record basic variables', () => {
		variables.set('FIRSTNAME', 'John');
		expect(variables.get('FIRSTNAME')).toEqual('John');
	});

	it('should run simple types', () => {
		expect(variables.run('"Hello world"')).toEqual('Hello world');
		expect(variables.run('true')).toEqual(true);
		expect(variables.run('2')).toEqual(2);
	});

	it('should handle calculated', () => {
		variables.set('FIRSTNAME', 'John');
		variables.set('LASTNAME', 'Doe');
		variables.setCalculated('FULLNAME', 'FIRSTNAME || " " || LASTNAME', {
			dependencies: ['FIRSTNAME', 'LASTNAME'],
		});
		expect(variables.get('FULLNAME')).toEqual('John Doe');
		expect(variables.interpretCount).toBe(1);
		// The result should be cached
		expect(variables.get('FULLNAME')).toEqual('John Doe');
		expect(variables.interpretCount).toBe(1);
		// But refreshed if a variable was updated
		variables.set('FIRSTNAME', 'Jane');
		expect(variables.get('FULLNAME')).toEqual('Jane Doe');
		expect(variables.interpretCount).toBe(2);
	});

	it('should handle deep calculation', () => {
		variables.set('FIRSTNAME', 'John');
		variables.set('LASTNAME', 'Doe');
		variables.set('AGE', '18');
		variables.setCalculated('FULLNAME', 'FIRSTNAME || " " || LASTNAME', {
			dependencies: ['FIRSTNAME', 'LASTNAME'],
		});
		variables.setCalculated('LABEL', 'FULLNAME || " is " || AGE', {
			dependencies: ['FULLNAME', 'AGE'],
		});
		expect(variables.get('LABEL')).toEqual('John Doe is 18');
		expect(variables.interpretCount).toBe(2);
		variables.set('AGE', '20');
		expect(variables.get('LABEL')).toEqual('John Doe is 20');
		expect(variables.interpretCount).toBe(3);
		variables.set('FIRSTNAME', 'Jane');
		expect(variables.get('LABEL')).toEqual('Jane Doe is 20');
		expect(variables.interpretCount).toBe(5);
		variables.get('LABEL');
		expect(variables.interpretCount).toBe(5);
	});

	it('should handle dependencies resolution', () => {
		variables.set('FIRSTNAME', 'John');
		variables.set('LASTNAME', 'Doe');
		variables.setCalculated('FULLNAME', 'FIRSTNAME || " " || LASTNAME');
		expect(variables.get('FULLNAME')).toEqual('John Doe');
		variables.set('FIRSTNAME', 'Jane');
		expect(variables.get('FULLNAME')).toEqual('Jane Doe');
	});

	it('should run expression on the fly', () => {
		variables.set('FIRSTNAME', 'John');
		variables.set('LASTNAME', 'Doe');
		expect(variables.run('FIRSTNAME || " " || LASTNAME')).toEqual('John Doe');
		expect(variables.run('FIRSTNAME || " " || LASTNAME')).toEqual('John Doe');
		expect(variables.interpretCount).toBe(1);
		variables.set('FIRSTNAME', 'Jane');
		expect(variables.run('FIRSTNAME || " " || LASTNAME')).toEqual('Jane Doe');
	});

	describe('with iteration', () => {
		it('should handle arrays', () => {
			variables.set('FIRSTNAME', ['John', 'Jane']);
			expect(variables.get('FIRSTNAME')).toEqual(['John', 'Jane']);
			expect(variables.get('FIRSTNAME', [0])).toEqual('John');
			expect(variables.get('FIRSTNAME', [1])).toEqual('Jane');
		});
		it('should handle setting at a specific index', () => {
			variables.set('FIRSTNAME', ['John', 'Jane']);
			variables.set('LASTNAME', null);
			variables.set('FIRSTNAME', 'Marc', { iteration: [1] });
			expect(variables.get('FIRSTNAME')).toEqual(['John', 'Marc']);
			variables.set('LASTNAME', 'Doe', { iteration: [1] });
			expect(variables.get('LASTNAME')).toEqual([null, 'Doe']);
		});
		it('should ignore non array values', () => {
			variables.set('FIRSTNAME', 'John');
			expect(variables.get('FIRSTNAME', [0])).toEqual('John');
		});
		it('should handle iteration in calculation', () => {
			variables.set('FIRSTNAME', ['John', 'Jane']);
			variables.set('LASTNAME', ['Doe', 'Dae']);
			variables.setCalculated('FULLNAME', 'FIRSTNAME || " " || LASTNAME', {
				dependencies: ['FIRSTNAME', 'LASTNAME'],
			});
			expect(variables.get('FULLNAME', [0])).toEqual('John Doe');
			expect(variables.get('FULLNAME', [1])).toEqual('Jane Dae');
			expect(variables.interpretCount).toBe(2);
			expect(variables.get('FULLNAME', [0])).toEqual('John Doe');
			expect(variables.get('FULLNAME', [1])).toEqual('Jane Dae');
			expect(variables.interpretCount).toBe(2);
			expect(variables.get('FULLNAME', [0])).toEqual('John Doe');
			variables.set('FIRSTNAME', ['John', 'Marc']);
			expect(variables.get('FULLNAME', [0])).toEqual('John Doe');
			expect(variables.get('FULLNAME', [1])).toEqual('Marc Dae');
			// Only the second iteration should be calculated
			expect(variables.interpretCount).toBe(3);
		});
		it('should handle aggregation expression', () => {
			variables.set('FIRSTNAME', ['John', 'Jane']);
			expect(variables.run('count(FIRSTNAME)')).toEqual(2);
			variables.set('FIRSTNAME', ['John', 'Jane', 'Marc']);
			expect(variables.run('count(FIRSTNAME)')).toEqual(3);
		});
		it('should handle non array values', () => {
			variables.set('FIRSTNAME', ['John', 'Jane']);
			variables.set('LASTNAME', 'Doe');
			expect(
				variables.run('FIRSTNAME || " " || LASTNAME', { iteration: [0] })
			).toEqual('John Doe');
			expect(
				variables.run('FIRSTNAME || " " || LASTNAME', { iteration: [1] })
			).toEqual('Jane Doe');
		});
	});

	describe('resizing', () => {
		it('should resize variables', () => {
			variables.set('PRENOM', ['John', 'Jane']);
			variables.set('NOM', ['Doe']);
			resizingBehaviour(variables, {
				PRENOM: {
					size: 'count(PRENOM)',
					variables: ['NOM'],
				},
			});
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			expect((variables.get('PRENOM') as string[]).length).toEqual(3);
			expect((variables.get('NOM') as string[]).length).toEqual(3);
		});
	});

	describe('cleaning', () => {
		it('should clean variables', () => {
			variables.set('PRENOM', 'John');
			variables.set('NOM', 'Doe');
			variables.set('READY', true);
			cleaningBehaviour(variables, {
				READY: {
					PRENOM: 'READY',
				},
			});
			expect(variables.get('PRENOM')).toEqual('John');
			variables.set('READY', false);
			expect(variables.get('PRENOM')).toEqual(null);
		});
		it('should clean variables with initial values', () => {
			variables.set('PRENOM', 'John');
			variables.set('READY', true);
			cleaningBehaviour(
				variables,
				{
					READY: {
						PRENOM: 'READY',
					},
				},
				{
					PRENOM: 'Jane',
				}
			);
			variables.set('READY', false);
			expect(variables.get('PRENOM')).toEqual('Jane');
		});
		it('should clean variables at a specific iteration', () => {
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			variables.set('READY', [true, true, true]);
			cleaningBehaviour(variables, {
				READY: {
					PRENOM: 'READY',
				},
			});
			variables.set('READY', false, { iteration: [1] });
			expect(variables.get('PRENOM')).toEqual(['John', null, 'Marc']);
		});
	});

	describe('missing', () => {
		beforeEach(() => {
			missingBehaviour(variables, {
				PRENOM: ['PRENOM_MISSING'],
				PRENOM_MISSING: ['PRENOM'],
			});
		});
		it('should handle missing', () => {
			variables.set('PRENOM', 'John');
			expect(variables.get('PRENOM')).toEqual('John');
			expect(variables.get('PRENOM_MISSING')).toEqual(null);
			variables.set('PRENOM_MISSING', 'DK');
			expect(variables.get('PRENOM')).toEqual(null);
			expect(variables.get('PRENOM_MISSING')).toEqual('DK');
		});
		it('should handle missing for iteration', () => {
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			expect(variables.get('PRENOM_MISSING')).toEqual(null);
			variables.set('PRENOM_MISSING', 'DK', { iteration: [1] });
			expect(variables.get('PRENOM')).toEqual(['John', null, 'Marc']);
			expect(variables.get('PRENOM_MISSING', [1])).toEqual('DK');
		});
	});
});
