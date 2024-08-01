import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleaningBehaviour } from './behaviours/cleaning-behaviour';
import { missingBehaviour } from './behaviours/missing-behaviour';
import { resizingBehaviour } from './behaviours/resizing-behaviour';
import { LunaticVariablesStore } from './lunatic-variables-store';

describe('lunatic-variables-store', () => {
	let variables: LunaticVariablesStore;

	beforeEach(() => {
		variables = new LunaticVariablesStore();
	});

	it('should record basic variables', () => {
		variables.set('FIRSTNAME', 'John');
		expect(variables.get('FIRSTNAME')).toEqual('John');
	});

	it('should handle array correctly', () => {
		variables.set('AGE', [10, 20, 30]);
		expect(variables.get('AGE')).toEqual([10, 20, 30]);
		variables.set('AGE', [10, 20]);
		expect(variables.get('AGE')).toEqual([10, 20]);
	});

	it('should create a store from an object', () => {
		const store = LunaticVariablesStore.makeFromObject({
			name: 'John',
			lastname: 'Doe',
		});
		expect(store.get('name')).toEqual('John');
		expect(store.get('lastname')).toEqual('Doe');
	});

	it('should run with simple types', () => {
		expect(variables.run('"Hello world"')).toEqual('Hello world');
		expect(variables.run('true')).toEqual(true);
		expect(variables.run('2')).toEqual(2);
	});

	it('should handle calculated', () => {
		variables.set('FIRSTNAME', 'John');
		variables.set('LASTNAME', 'Doe');
		variables.setCalculated('FULLNAME', 'FIRSTNAME || " " || LASTNAME', {
			dependencies: ['FIRSTNAME', 'LASTNAME'],
			shapeFrom: 'FIRSTNAME',
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
			shapeFrom: 'FIRSTNAME',
		});
		variables.setCalculated('LABEL', 'FULLNAME || " is " || AGE', {
			dependencies: ['FULLNAME', 'AGE'],
			shapeFrom: 'FULLNAME',
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
		expect(variables.interpretCount).toBe(2);
		variables.set('FIRSTNAME', 'Jane');
		expect(variables.run('FIRSTNAME || " " || LASTNAME')).toEqual('Jane Doe');
	});

	it('should throw an exception when calculated incorrect VTL', () => {
		expect(() => variables.run('Hello world')).toThrowError();
	});

	describe('event listener', () => {
		it('should trigger onChange', () => {
			variables.set('FIRSTNAME', 'John');
			const spy = vi.fn();
			variables.on('change', (e) => spy(e.detail.name, e.detail.value));
			variables.set('FIRSTNAME', 'Jane');
			expect(spy).toHaveBeenCalledWith('FIRSTNAME', 'Jane');
		});

		it('should trigger onChange on array', () => {
			variables.set('AGE', [18, 23, 24]);
			const spy = vi.fn();
			variables.on('change', (e) => spy(e.detail.name, e.detail.value));
			variables.set('AGE', [18, 23]);
			expect(spy).toHaveBeenCalledWith('AGE', [18, 23]);
			variables.set('AGE', [18, 25]);
			expect(spy).toHaveBeenCalledWith('AGE', [18, 25]);
		});

		it('should not trigger onChange when value does not change', () => {
			variables.set('FIRSTNAME', 'John');
			variables.set('AGE', [18, 20]);
			const spy = vi.fn();
			variables.on('change', (e) => spy(e.detail.name, e.detail.value));
			variables.set('FIRSTNAME', 'John');
			variables.set('AGE', [18, 20]);
			expect(spy).not.toHaveBeenCalled();
		});
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
				shapeFrom: 'FIRSTNAME',
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
		it('should handle iteration with multiple shapeFrom', () => {
			variables.set('FIRSTNAME', ['John']);
			variables.set('LASTNAME', ['Doe', 'Dae']);
			variables.setCalculated(
				'FULLNAME',
				'nvl(FIRSTNAME, "") || " " || nvl(LASTNAME, "")',
				{
					dependencies: ['FIRSTNAME', 'LASTNAME'],
					shapeFrom: ['FIRSTNAME', 'LASTNAME'],
				}
			);
			expect(variables.get('FULLNAME')).toEqual(['John Doe', ' Dae']);
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
		it('should handle global iteration variable', () => {
			variables.set('FIRSTNAME', ['John', 'Jane']);
			variables.setCalculated(
				'FULLNAME',
				'FIRSTNAME || " " || cast(GLOBAL_ITERATION_INDEX, string)',
				{ shapeFrom: 'FIRSTNAME' }
			);
			expect(variables.get('FULLNAME', [0])).toEqual('John 1');
			expect(variables.get('FULLNAME', [1])).toEqual('Jane 2');
		});
		it('should handle shapeFrom correctly', () => {
			variables.set('FIRSTNAME', ['John', 'Jane']);
			variables.setCalculated(
				'FULLNAME',
				'FIRSTNAME || " " || cast(GLOBAL_ITERATION_INDEX, string)',
				{ shapeFrom: 'FIRSTNAME' }
			);
			expect(variables.get('FULLNAME')).toEqual(['John 1', 'Jane 2']);
		});
		it('should handle aggregate functions', () => {
			variables.set('AGE', [1, 2, 3]);
			variables.setCalculated('MAXAGE', 'max(AGE)');
			variables.setCalculated('AGE_AND_MAX', 'AGE + MAXAGE', {
				shapeFrom: 'AGE',
			});
			expect(variables.get('AGE_AND_MAX', [0])).toEqual(4);
			variables.set('AGE', 12, { iteration: [1] });
			expect(variables.get('AGE', [1])).toEqual(12);
			expect(variables.get('AGE_AND_MAX', [0])).toEqual(13);
		});
		it('should handle primitive value', () => {
			variables.run('"hello"', { iteration: [0] });
			variables.run('"hello"', { iteration: [1] });
			expect(variables.run('"hello"')).toEqual('hello');
			expect(variables.interpretCount).toBe(3);
		});
		it('should handle deep refresh', () => {
			variables.set('LIENS', [
				['17', null],
				[null, '17'],
			]);
			variables.setCalculated('IS_12', 'if ("12" in LIENS) then 1 else 0', {
				dependencies: ['LIENS'],
				shapeFrom: 'LIENS',
			});
			expect(variables.get('IS_12', [0])).toBe(0);
			variables.set('LIENS', '12', { iteration: [0, 0] });
			expect(variables.get('IS_12', [0])).toBe(1);
		});
		it('should handle empty array for calculated', () => {
			variables.set('AGE', []);
			variables.setCalculated('MAJEUR', 'AGE > 18', {
				dependencies: ['AGE'],
				shapeFrom: 'AGE',
			});
			expect(variables.get('MAJEUR')).toEqual([]);
		});
	});

	describe('resizing', () => {
		it('should resize variables', () => {
			variables.set('PRENOM', ['John', 'Jane']);
			variables.set('NOM', ['Doe']);
			const spy = vi.fn();
			variables.on('change', (e) => spy(e.detail));
			resizingBehaviour(variables, {
				PRENOM: {
					size: 'count(PRENOM)',
					variables: ['NOM'],
				},
			});
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			expect((variables.get('PRENOM') as string[]).length).toEqual(3);
			expect((variables.get('NOM') as string[]).length).toEqual(3);
			expect(spy).toHaveBeenLastCalledWith({
				name: 'NOM',
				value: ['Doe', null, null],
				cause: 'resizing',
			});
		});
		it('should resize pairwise with the array syntax', () => {
			variables.set('PRENOM', []);
			variables.set('LINKS', [[]]);
			resizingBehaviour(variables, {
				PRENOM: {
					sizeForLinksVariables: ['count(PRENOM)', 'count(PRENOM)'],
					linksVariables: ['LINKS'],
				},
			});
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			expect(variables.get('LINKS') as string[][]).toEqual([
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]);
		});
		it('should resize pairwise with the object syntax', () => {
			variables.set('PRENOM', []);
			variables.set('LINKS', [[]]);
			resizingBehaviour(variables, {
				PRENOM: {
					sizeForLinksVariables: {
						xAxisSize: 'count(PRENOM)',
						yAxisSize: 'count(PRENOM)',
					},
					linksVariables: ['LINKS'],
				},
			});
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			expect(variables.get('LINKS') as string[][]).toEqual([
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]);
		});
		it('should handle both pairwise and normal resize', () => {
			variables.set('PRENOM', []);
			variables.set('NOM', []);
			variables.set('LINKS', [[]]);
			resizingBehaviour(variables, {
				PRENOM: {
					sizeForLinksVariables: ['count(PRENOM)', 'count(PRENOM)'],
					linksVariables: ['LINKS'],
					size: 'count(PRENOM)',
					variables: ['NOM'],
				},
			});
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			expect(variables.get('LINKS') as string[][]).toEqual([
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]);
			expect(variables.get('NOM') as string[]).toEqual([null, null, null]);
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
			cleaningBehaviour(
				variables,
				{
					READY: {
						PRENOM: 'READY',
					},
				},
				{ PRENOM: [null] }
			);
			variables.set('READY', false, { iteration: [1] });
			expect(variables.get('PRENOM')).toEqual(['John', null, 'Marc']);
		});
		it('should clean variables with initial value at specific iteration', () => {
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			variables.set('READY', [true, true, true]);
			cleaningBehaviour(
				variables,
				{
					READY: {
						PRENOM: 'READY',
					},
				},
				{ PRENOM: [null] }
			);
			variables.set('READY', false, { iteration: [1] });
			expect(variables.get('PRENOM')).toEqual(['John', null, 'Marc']);
		});
		it('should clean root variables even when in an iteration', () => {
			variables.set('PRENOM', 'John');
			variables.set('READY', [true, true, true]);
			cleaningBehaviour(
				variables,
				{
					READY: {
						PRENOM: 'READY',
					},
				},
				{ PRENOM: null }
			);
			variables.set('READY', false, { iteration: [1] });
			expect(variables.get('PRENOM')).toEqual(null);
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

	describe('makeFromSource', () => {
		it('should handle initial data correctly', () => {
			const store = LunaticVariablesStore.makeFromSource(
				{
					components: [],
					variables: [
						{
							name: 'PRENOM',
							values: {
								EDITED: null,
								FORCED: null,
								INPUTTED: null,
								PREVIOUS: null,
								COLLECTED: 'John',
							},
							variableType: 'COLLECTED',
						},
						{
							name: 'NOM',
							values: {
								EDITED: null,
								FORCED: null,
								INPUTTED: null,
								PREVIOUS: null,
								COLLECTED: '',
							},
							variableType: 'COLLECTED',
						},
					],
					cleaning: {
						NOM: {
							PRENOM: 'false',
						},
					},
				},
				{
					COLLECTED: {
						PRENOM: {
							COLLECTED: 'Jane',
						},
					},
				},
				{ current: () => {} }
			);
			expect(store.get('PRENOM')).toEqual('Jane');
			store.set('NOM', 'Doe');
			expect(store.get('PRENOM')).toEqual('John');
		});
	});
});
