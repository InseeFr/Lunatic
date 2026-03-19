import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleaningBehaviour } from './behaviours/cleaning-behaviour';
import * as cleaningModule from './behaviours/cleaning-behaviour';
import { missingBehaviour } from './behaviours/missing-behaviour';
import { resizingBehaviour } from './behaviours/resizing-behaviour';
import { LunaticVariablesStore } from './lunatic-variables-store';
import { ComponentDefinitionWithPage } from '../../../type.source';

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
		expect(variables.interpretCount).toBe(1); // only once computation since improvement of caching result
		variables.set('FIRSTNAME', 'Jane');
		expect(variables.run('FIRSTNAME || " " || LASTNAME')).toEqual('Jane Doe');
	});

	it('should throw an exception when calculated incorrect VTL', () => {
		expect(() => variables.run('Hello world')).toThrowError();
	});

	it('should handle calculated with aggregates', () => {
		variables.set('AGES', [1, 2, 3]);
		variables.setCalculated('NB_HAB', 'count(AGES)');
		variables.setCalculated('AGES_PLUS_NBHAB', 'NB_HAB + AGES', {
			shapeFrom: 'AGES',
		});
		expect(variables.get('NB_HAB')).toBe(3);
		expect(variables.get('AGES_PLUS_NBHAB', [0])).toBe(4);
		expect(variables.get('AGES_PLUS_NBHAB')).toEqual([4, 5, 6]);
	});

	it('should handle transaction mode correctly', () => {
		variables.set('FIRSTNAME', 'John');
		expect(variables.get('FIRSTNAME')).toEqual('John');
		variables.enqueueSet('FIRSTNAME', 'Jane');
		expect(variables.get('FIRSTNAME')).toEqual('John');
		variables.commit();
		expect(variables.get('FIRSTNAME')).toEqual('Jane');
	});

	it('should ignore iteration when updating a scalar value', () => {
		variables.set('FIRSTNAME', 'John'); // Start with a scalar value
		expect(variables.get('FIRSTNAME')).toEqual('John');
		variables.set('FIRSTNAME', 'Jane', {
			iteration: [1],
			ignoreIterationOnScalar: true,
		});
		expect(variables.get('FIRSTNAME')).toEqual('Jane');
		variables.set('FIRSTNAME', 'Marc', { iteration: [1] });
		expect(variables.get('FIRSTNAME')).toEqual([null, 'Marc']);
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
			expect(variables.interpretCount).toBe(1); // only 1 interpretation by the engine since optimisation for primitive value
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
		beforeEach(() => {
			variables.autoCommit = true;
		});

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
			// Adding a person should not reset links
			variables.set('LINKS', [
				[null, '1', '3'],
				['1', null, '3'],
				['2', '2', null],
			]);
			variables.set('PRENOM', 'Marie', { iteration: [3] });
			expect(variables.get('LINKS') as string[][]).toEqual([
				[null, '1', '3', null],
				['1', null, '3', null],
				['2', '2', null, null],
				[null, null, null, null],
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
		beforeEach(() => {
			variables.autoCommit = true;
		});

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
		it('should handle the new array format', () => {
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			variables.set('READY', [true, true, true]);
			cleaningBehaviour(
				variables,
				{
					READY: {
						PRENOM: [
							{
								expression: 'READY',
								shapeFrom: 'READY',
								isAggregatorUsed: false,
							},
						],
					},
				},
				{ PRENOM: [null] }
			);
			variables.set('READY', false, { iteration: [1] });
			expect(variables.get('PRENOM')).toEqual(['John', null, 'Marc']);
		});
		it('should handle cleaning on aggregations', () => {
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			variables.set('READY', [true, true, true]);
			variables.setCalculated('NB_HAB', 'count(PRENOM)');
			cleaningBehaviour(
				variables,
				{
					READY: {
						PRENOM: [
							{
								expression: 'READY',
								shapeFrom: 'READY',
								isAggregatorUsed: false,
							},
							{
								expression: 'NB_HAB > 1',
								isAggregatorUsed: true,
							},
						],
					},
				},
				{ PRENOM: [null] }
			);
			variables.set('READY', false, { iteration: [1], cause: 'resizing' });
			expect(variables.get('PRENOM')).toEqual(['John', 'Jane', 'Marc']);
			variables.set('PRENOM', ['John'], { cause: 'resizing' });
			variables.set('READY', [true], { cause: 'resizing' });
			expect(variables.get('PRENOM')).toEqual([null]);
		});

		it('should evaluate cleaning for each iteration', () => {
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			variables.set('READY', [true, true, true]);
			cleaningBehaviour(
				variables,
				{
					READY: {
						PRENOM: [
							{
								expression: 'READY',
								shapeFrom: 'READY',
								isAggregatorUsed: false,
							},
						],
					},
				},
				{ PRENOM: [null] }
			);
			variables.set('READY', [true, true, false]);
			expect(variables.get('PRENOM')).toEqual(['John', 'Jane', null]);
		});
		it('should evaluate cleaning for each iteration at root level', () => {
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			variables.set('AGE', [18, 21, 23]);
			variables.setCalculated('NB_HAB', 'count(PRENOM)');
			resizingBehaviour(variables, {
				PRENOM: {
					size: 'count(PRENOM)',
					variables: ['AGE'],
				},
			});
			cleaningBehaviour(
				variables,
				{
					PRENOM: {
						AGE: [
							{
								expression: 'NB_HAB >= 3',
								shapeFrom: 'PRENOM',
								isAggregatorUsed: true,
							},
						],
					},
				},
				{ PRENOM: [], AGE: [] }
			);
			variables.set('PRENOM', ['John', 'Jane']);
			expect(variables.get('AGE')).toEqual([null, null]);
		});
		it('should check every iteration when configured from an iterated source change', () => {
			// Given
			variables.set('PRENOM', ['Marc', 'Marc', 'Marc']);
			variables.set('QCU', ['A', 'B', 'B']);
			cleaningBehaviour(
				variables,
				{
					PRENOM: {
						QCU: [
							{
								expression: 'PRENOM <> "Marc"',
								shapeFrom: 'PRENOM',
								isAggregatorUsed: false,
								shouldCheckAllIterations: true,
							},
						],
					},
				},
				{ PRENOM: [], QCU: [null] }
			);

			// When
			variables.set('PRENOM', 'Patrick', { iteration: [0] });

			// Then
			expect(variables.get('QCU')).toEqual(['A', null, null]);
		});
		it('should handle simultaneously expressions that should check every iteration and expression that should not ', () => {
			// Given
			variables.set('PRENOM', ['Marc', 'Marc', 'Marc']);
			variables.set('QCU', ['A', 'B', 'B']);
			cleaningBehaviour(
				variables,
				{
					PRENOM: {
						QCU: [
							{
								expression: 'PRENOM <> ""',
								shapeFrom: 'PRENOM',
								isAggregatorUsed: false,
							},
							{
								expression: 'PRENOM <> "Marc"',
								shapeFrom: 'PRENOM',
								isAggregatorUsed: false,
								shouldCheckAllIterations: true,
							},
						],
					},
				},
				{ PRENOM: [], QCU: [null] }
			);

			// When
			variables.set('PRENOM', '', { iteration: [0] });

			// Then
			expect(variables.get('QCU')).toEqual([null, null, null]);
		});
		it('should clean pairwise in two directions', () => {
			variables.set('LINKS', [
				[null, '1', '3'],
				['1', null, '3'],
				['2', '2', null],
			]);
			variables.set('PRENOM', ['Dad', 'Mom', 'Unknow']);
			cleaningBehaviour(
				variables,
				{
					PRENOM: {
						LINKS: [
							{
								expression: 'PRENOM <> ""',
								shapeFrom: 'PRENOM',
								isAggregatorUsed: true,
							},
						],
					},
				},
				{
					PRENOM: [],
					LINKS: [],
				}
			);
			variables.set('PRENOM', '', { iteration: [1] });
			expect(variables.get('PRENOM')).toEqual(['Dad', '', 'Unknow']);
			expect(variables.get('LINKS')).toEqual([
				[null, null, '3'],
				[null, null, null],
				['2', null, null],
			]);
			variables.set('PRENOM', '', { iteration: [0] });
			expect(variables.get('LINKS')).toEqual([
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]);
		});
		it('should handle not clean itself', () => {
			variables.set('PRENOM', ['Renoir', 'Alicia', 'Verso']);
			cleaningBehaviour(
				variables,
				{
					PRENOM: {
						PRENOM: [
							{
								expression: 'PRENOM <> "Renoir"',
								shapeFrom: 'PRENOM',
								isAggregatorUsed: false,
							},
						],
					},
				},
				{ PRENOM: [null] }
			);

			variables.set('PRENOM', 'Maëlle', { iteration: [1] });
			expect(variables.get('PRENOM')).toEqual(['Renoir', 'Maëlle', 'Verso']);
		});
	});

	describe('cleaning with queue', () => {
		beforeEach(() => {
			variables.autoCommit = false;
		});

		it('should not clean variables directly', () => {
			variables.set('PRENOM', 'John');
			variables.set('READY', true);
			cleaningBehaviour(variables, {
				READY: {
					PRENOM: 'READY',
				},
			});
			expect(variables.get('PRENOM')).toEqual('John');
			variables.set('READY', false);
			expect(variables.get('PRENOM')).toEqual('John');
		});

		it('should clean variables when commit', () => {
			variables.set('PRENOM', 'John');
			variables.set('READY', true);
			cleaningBehaviour(variables, {
				READY: {
					PRENOM: 'READY',
				},
			});
			expect(variables.get('PRENOM')).toEqual('John');
			variables.set('READY', false);
			variables.commit();
			expect(variables.get('PRENOM')).toEqual(null);
		});

		it('should not clean variables when the variable has not really changed after commit', () => {
			variables.set('PRENOM', 'John');
			variables.set('READY', true);
			cleaningBehaviour(variables, {
				READY: {
					PRENOM: 'READY',
				},
			});
			expect(variables.get('PRENOM')).toEqual('John');
			variables.set('READY', false);
			variables.set('READY', true);
			variables.commit();
			expect(variables.get('PRENOM')).toEqual('John');
		});

		it('should clean pairwise in two directions with a queue', () => {
			variables.set('LINKS', [
				[null, '1', '3'],
				['1', null, '3'],
				['2', '2', null],
			]);
			variables.set('PRENOM', ['Dad', 'Mom', 'Unknow']);
			cleaningBehaviour(
				variables,
				{
					PRENOM: {
						LINKS: [
							{
								expression: 'PRENOM <> ""',
								shapeFrom: 'PRENOM',
								isAggregatorUsed: false,
							},
						],
					},
				},
				{
					PRENOM: [],
					LINKS: [],
				}
			);

			// when
			variables.set('PRENOM', '', { iteration: [1] });
			variables.set('PRENOM', '', { iteration: [2] });

			expect(variables.get('PRENOM')).toEqual(['Dad', '', '']);
			variables.commit();
			// then
			expect(variables.get('LINKS')).toEqual([
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]);
		});

		it('should clean pairwise in two directions with a queue with canceling', () => {
			variables.set('LINKS', [
				[null, '1', '3'],
				['1', null, '3'],
				['2', '2', null],
			]);
			variables.set('PRENOM', ['Dad', 'Mom', 'Unknow']);
			cleaningBehaviour(
				variables,
				{
					PRENOM: {
						LINKS: [
							{
								expression: 'PRENOM <> ""',
								shapeFrom: 'PRENOM',
								isAggregatorUsed: false,
							},
						],
					},
				},
				{
					PRENOM: [],
					LINKS: [],
				}
			);

			// when
			variables.set('PRENOM', '', { iteration: [1] });
			variables.set('PRENOM', '', { iteration: [2] });

			expect(variables.get('PRENOM')).toEqual(['Dad', '', '']);

			variables.set('PRENOM', 'Not Unknow', { iteration: [2] });
			expect(variables.get('PRENOM')).toEqual(['Dad', '', 'Not Unknow']);
			variables.commit();
			// then
			expect(variables.get('LINKS')).toEqual([
				[null, null, '3'],
				[null, null, null],
				['2', null, null],
			]);
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

	describe('commit', () => {
		it('should handle data change before commit', () => {
			variables.set('PRENOM', []);
			variables.set('NOM', []);
			resizingBehaviour(variables, {
				PRENOM: {
					size: 'count(PRENOM)',
					variables: ['NOM'],
				},
			});
			variables.set('PRENOM', ['John', 'Jane', 'Marc']);
			variables.set('NOM', ['Doe', 'Doe2', 'Doe3']);
			variables.set('PRENOM', ['John', 'Jane']); // Should trigger a delayed resize
			variables.set('NOM', 'New', { iteration: [1] }); // But we change a value inside the resized variable
			variables.commit();
			expect(variables.get('NOM') as string[][]).toEqual(['Doe', 'New']);
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
								COLLECTED: 'John',
							},
							variableType: 'COLLECTED',
						},
						{
							name: 'NOM',
							values: {
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
				{
					changeHandler: { current: () => {} },
				}
			);
			expect(store.get('PRENOM')).toEqual('Jane');
			store.set('NOM', 'Doe');
			store.commit();
			expect(store.get('PRENOM')).toEqual('John');
		});

		it('should handle calculated variables, ignoring them when `isIgnoredByLunatic` is true ', () => {
			const store = LunaticVariablesStore.makeFromSource(
				{
					components: [],
					variables: [
						{
							name: 'calc1',
							dimension: 0,
							expression: {
								type: 'VTL',
								value: '"calculated value"',
							},
							variableType: 'CALCULATED',
							isIgnoredByLunatic: true,
						},
						{
							name: 'calc2',
							dimension: 0,
							expression: {
								type: 'VTL',
								value: '"calculated value"',
							},
							variableType: 'CALCULATED',
							isIgnoredByLunatic: false,
						},
						{
							name: 'calc3',
							dimension: 0,
							expression: {
								type: 'VTL',
								value: '"calculated value"',
							},
							variableType: 'CALCULATED',
						},
					],
				},
				{},
				{
					changeHandler: { current: () => {} },
				}
			);

			expect(store.get('calc1')).toBeNull();
			expect(store.get('calc2')).toBe('calculated value');
			expect(store.get('calc3')).toBe('calculated value');
		});

		it('should enable cleaning when disableCleaning = false', () => {
			const cleaningSpy = vi.spyOn(cleaningModule, 'cleaningBehaviour');
			LunaticVariablesStore.makeFromSource(
				{
					components: [],
					variables: [
						{
							name: 'PRENOM',
							values: {
								COLLECTED: 'John',
							},
							variableType: 'COLLECTED',
						},
						{
							name: 'NOM',
							values: {
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
				{
					changeHandler: { current: () => {} },
					disableCleaning: false, // enable cleaning
				}
			);
			expect(cleaningSpy).toHaveBeenCalled();
		});
		it('should disable cleaning when disableCleaning = true', () => {
			const cleaningSpy = vi.spyOn(cleaningModule, 'cleaningBehaviour');
			LunaticVariablesStore.makeFromSource(
				{
					components: [],
					variables: [
						{
							name: 'PRENOM',
							values: {
								COLLECTED: 'John',
							},
							variableType: 'COLLECTED',
						},
						{
							name: 'NOM',
							values: {
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
				{
					changeHandler: { current: () => {} },
					disableCleaning: true, // disable cleaning
				}
			);
			expect(cleaningSpy).not.toHaveBeenCalled();
		});

		it('should create global pairwise variables', () => {
			// Given a source with a pairwise component
			const pairwiseComponent = {
				id: 'm8ob5u9l',
				page: '3',
				symLinks: {
					LINKS: {
						'1': '1',
						'2': '3',
						'3': '2',
					},
				},
				components: [
					{
						id: 'm8ob5u9l-pairwise-dropdown',
						label: {
							type: 'VTL|MD',
							value: '"Qui est " || yAxis || " pour " || xAxis || " ?"',
						},
						options: [
							{
								label: {
									type: 'VTL',
									value: '"Son conjoint, sa conjointe"',
								},
								value: '1',
							},
							{
								label: { type: 'VTL', value: '"Sa mère, son père"' },
								value: '2',
							},
							{
								label: { type: 'VTL', value: '"Sa fille, son fils"' },
								value: '3',
							},
						],
						response: { name: 'LINKS' },
						isMandatory: false,
						componentType: 'Dropdown',
						conditionFilter: {
							type: 'VTL',
							value: '(nvl(xAxis, "") <> "") and (nvl(yAxis, "") <> "")',
						},
					},
				],
				sourceVariables: {
					name: 'PRENOM',
					gender: 'SEXE',
				},
				componentType: 'PairwiseLinks',
				xAxisIterations: { type: 'VTL', value: 'count(PRENOM)' },
				yAxisIterations: { type: 'VTL', value: 'count(PRENOM)' },
			} as ComponentDefinitionWithPage;

			// When we create the store
			const store = LunaticVariablesStore.makeFromSource(
				{
					components: [pairwiseComponent],
					variables: [
						{
							name: 'PRENOM',
							values: { COLLECTED: [] },
							dimension: 1,
							variableType: 'COLLECTED',
							iterationReference: 'm8ob7c76',
						},
						{
							name: 'SEXE',
							values: { COLLECTED: [] },
							dimension: 1,
							variableType: 'COLLECTED',
							iterationReference: 'm8ob7c76',
						},
						{
							name: 'LINKS',
							values: { COLLECTED: [[]] },
							dimension: 2,
							variableType: 'COLLECTED',
							iterationReference: 'm8ob7c76',
						},
					],
				},
				{},
				{ changeHandler: { current: () => {} } }
			);

			// Then pairwise global variables are initialized
			expect(store.get('GLOBAL_PARENT1_PRENOM', [0])).toBeUndefined();
			expect(store.get('GLOBAL_PARENT2_PRENOM', [0])).toBeUndefined();
			expect(store.get('GLOBAL_PARENT1_SEXE', [0])).toBeUndefined();
			expect(store.get('GLOBAL_PARENT2_SEXE', [0])).toBeUndefined();
			expect(store.get('GLOBAL_CONJOINT_PRENOM', [0])).toBeUndefined();
			expect(store.get('GLOBAL_ENFANTS_PRENOMS', [0])).toBeUndefined();

			// When pairwise link is updated
			store.set('PRENOM', [
				'Verso',
				'Renoir',
				'Aline',
				'Monoco',
				'Noco',
				'Alicia',
				'Sciel',
			]);
			store.set('SEXE', ['1', '1', '2', '1', '1', '2', '2']);
			store.set('LINKS', [
				[null, '2', '2', '3', '3', null, '1'],
				['3', null, '1', null, null, '3', null],
				['3', '1', null, null, null, '3', null],
				['2', null, null, null, null, null, null],
				['2', null, null, null, null, null, null],
				[null, '2', '2', null, null, null, null],
				['1', null, null, null, null, null, null],
			]);
			store.commit();

			// Then the variables are set at the proper value
			expect(store.get('GLOBAL_PARENT1_PRENOM', [0])).toBe('Renoir');
			expect(store.get('GLOBAL_PARENT2_PRENOM', [0])).toBe('Aline');
			expect(store.get('GLOBAL_PARENT1_SEXE', [0])).toBe('1');
			expect(store.get('GLOBAL_PARENT2_SEXE', [0])).toBe('2');
			expect(store.get('GLOBAL_CONJOINT_PRENOM', [0])).toBe('Sciel');
			expect(store.get('GLOBAL_ENFANTS_PRENOMS', [0])).toBe('Monoco#Noco');

			expect(store.get('GLOBAL_PARENT1_PRENOM', [1])).toBeUndefined();
			expect(store.get('GLOBAL_PARENT2_PRENOM', [1])).toBeUndefined();
			expect(store.get('GLOBAL_PARENT1_SEXE', [1])).toBeUndefined();
			expect(store.get('GLOBAL_PARENT2_SEXE', [1])).toBeUndefined();
			expect(store.get('GLOBAL_CONJOINT_PRENOM', [1])).toBe('Aline');
			expect(store.get('GLOBAL_ENFANTS_PRENOMS', [1])).toBe('Verso#Alicia');

			// Test with replace VTL function
			expect(
				store.run(
					`"Your children are " || replace(GLOBAL_ENFANTS_PRENOMS, "#", ", ")`,
					{
						iteration: [1],
					}
				)
			).toBe('Your children are Verso, Alicia');

			expect(store.get('GLOBAL_ENFANTS_PRENOMS', [4])).toBe(undefined);
		});

		it('should compute correctly GLOBAL array variable across calculated variables, even if not intialize', () => {
			// Given a source with a pairwise component
			const pairwiseComponent = {
				id: 'm8ob5u9l',
				page: '3',
				symLinks: {
					LINKS: {
						'1': '1',
						'2': '3',
						'3': '2',
					},
				},
				components: [
					{
						id: 'm8ob5u9l-pairwise-dropdown',
						label: {
							type: 'VTL|MD',
							value: '"Qui est " || yAxis || " pour " || xAxis || " ?"',
						},
						options: [
							{
								label: {
									type: 'VTL',
									value: '"Son conjoint, sa conjointe"',
								},
								value: '1',
							},
							{
								label: { type: 'VTL', value: '"Sa mère, son père"' },
								value: '2',
							},
							{
								label: { type: 'VTL', value: '"Sa fille, son fils"' },
								value: '3',
							},
						],
						response: { name: 'LINKS' },
						isMandatory: false,
						componentType: 'Dropdown',
						conditionFilter: {
							type: 'VTL',
							value: '(nvl(xAxis, "") <> "") and (nvl(yAxis, "") <> "")',
						},
					},
				],
				sourceVariables: {
					name: 'PRENOM',
					gender: 'SEXE',
				},
				componentType: 'PairwiseLinks',
				xAxisIterations: { type: 'VTL', value: 'count(PRENOM)' },
				yAxisIterations: { type: 'VTL', value: 'count(PRENOM)' },
			} as ComponentDefinitionWithPage;

			// When we create the store
			const store = LunaticVariablesStore.makeFromSource(
				{
					components: [pairwiseComponent],
					variables: [
						{
							name: 'PRENOM',
							values: { COLLECTED: [] },
							dimension: 1,
							variableType: 'COLLECTED',
							iterationReference: 'm8ob7c76',
						},
						{
							name: 'SEXE',
							values: { COLLECTED: [] },
							dimension: 1,
							variableType: 'COLLECTED',
							iterationReference: 'm8ob7c76',
						},
						{
							name: 'LINKS',
							values: { COLLECTED: [[]] },
							dimension: 2,
							variableType: 'COLLECTED',
							iterationReference: 'm8ob7c76',
						},
					],
				},
				{},
				{ changeHandler: { current: () => {} } }
			);

			// When pairwise link is updated
			store.set('PRENOM', ['Child', 'Dad']);
			store.set('SEXE', ['1', '1']);
			store.set('LINKS', [
				[null, '2'],
				['3', null],
			]);
			store.commit();
			expect(
				store.run('"Your children are : " || GLOBAL_ENFANTS_PRENOMS', {
					iteration: [0],
				})
			).toBe('Your children are : null');
			expect(
				store.run('"Your children are : " || GLOBAL_ENFANTS_PRENOMS', {
					iteration: [1],
				})
			).toBe('Your children are : Child');
		});
	});
});
