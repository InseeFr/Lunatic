import { describe, it, beforeEach, expect } from 'vitest';
import { LunaticVariables } from './lunatic-variables';

describe('lunatic-variables', () => {
	let variables: LunaticVariables;
	beforeEach(() => {
		variables = new LunaticVariables();
	});

	it('should record basic variables', () => {
		variables.set('FIRSTNAME', 'John');
		expect(variables.get('FIRSTNAME')).toEqual('John');
	});

	it('should handle calculated', () => {
		variables.set('FIRSTNAME', 'John');
		variables.set('LASTNAME', 'Doe');
		variables.setCalculated('FULLNAME', 'FIRSTNAME || " " || LASTNAME', [
			'FIRSTNAME',
			'LASTNAME',
		]);
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
		variables.setCalculated('FULLNAME', 'FIRSTNAME || " " || LASTNAME', [
			'FIRSTNAME',
			'LASTNAME',
		]);
		variables.setCalculated('LABEL', 'FULLNAME || " is " || AGE', [
			'FULLNAME',
			'AGE',
		]);
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
			expect(variables.get('FIRSTNAME', 0)).toEqual('John');
			expect(variables.get('FIRSTNAME', 1)).toEqual('Jane');
		});
		it('should ignore non array values', () => {
			variables.set('FIRSTNAME', 'John');
			expect(variables.get('FIRSTNAME', 0)).toEqual('John');
		});
		it('should handle iteration in calculation', () => {
			variables.set('FIRSTNAME', ['John', 'Jane']);
			variables.set('LASTNAME', ['Doe', 'Dae']);
			variables.setCalculated('FULLNAME', 'FIRSTNAME || " " || LASTNAME', [
				'FIRSTNAME',
				'LASTNAME',
			]);
			expect(variables.get('FULLNAME', 0)).toEqual('John Doe');
			expect(variables.get('FULLNAME', 1)).toEqual('Jane Dae');
			expect(variables.interpretCount).toBe(2);
			expect(variables.get('FULLNAME', 0)).toEqual('John Doe');
			expect(variables.get('FULLNAME', 1)).toEqual('Jane Dae');
			expect(variables.interpretCount).toBe(2);
			expect(variables.get('FULLNAME', 0)).toEqual('John Doe');
			variables.set('FIRSTNAME', ['John', 'Marc']);
			expect(variables.get('FULLNAME', 0)).toEqual('John Doe');
			expect(variables.get('FULLNAME', 1)).toEqual('Marc Dae');
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
			expect(variables.run('FIRSTNAME || " " || LASTNAME', 0)).toEqual(
				'John Doe'
			);
			expect(variables.run('FIRSTNAME || " " || LASTNAME', 1)).toEqual(
				'Jane Doe'
			);
		});
	});
});
