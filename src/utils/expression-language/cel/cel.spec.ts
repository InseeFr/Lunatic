import { describe, it, expect } from 'vitest';
import { getExpressionVariables as vars } from './cel';

describe('getExpressionVariables', () => {
	it('basic expression', () => {
		expect(
			vars('user.name.startsWith("A") && TEST > 454 && !(VAR_TEST && true)')
		).toEqual(['user', 'TEST', 'VAR_TEST']);
	});

	it('has()', () => {
		expect(vars('has(request.auth.claims.email)')).toEqual(['request']);
	});

	it('all / exists / exists_one: the bound variable is excluded', () => {
		expect(vars('items.all(x, x > min)')).toEqual(['items', 'min']);
		expect(vars('items.exists(x, x == target)')).toEqual(['items', 'target']);
		expect(vars('items.exists_one(x, x == target)')).toEqual([
			'items',
			'target',
		]);
	});

	it('filter / map', () => {
		expect(vars('items.filter(x, x > limit)')).toEqual(['items', 'limit']);
		expect(vars('items.map(x, x * factor)')).toEqual(['items', 'factor']);
	});

	it('map with 3 arguments', () => {
		expect(vars('items.map(x, x > limit, x * factor)')).toEqual([
			'items',
			'limit',
			'factor',
		]);
	});

	it('nested macros', () => {
		expect(vars('groups.all(g, g.members.exists(m, m.age > minAge))')).toEqual([
			'groups',
			'minAge',
		]);
	});

	it('a bound variable does not leak outside its macro', () => {
		expect(vars('items.all(x, x > 0) && x == 1')).toEqual(['items', 'x']);
	});

	it('size() and global functions', () => {
		expect(vars('size(items) > 0')).toEqual(['items']);
	});

	it('list, map, ternary, index and unary nodes', () => {
		expect(vars('[a, b].size() > 0')).toEqual(['a', 'b']);
		expect(vars('{"k": v}.size() > 0')).toEqual(['v']);
		expect(vars('flag ? yes : no')).toEqual(['flag', 'yes', 'no']);
		expect(vars('arr[idx] == -n')).toEqual(['arr', 'idx', 'n']);
	});
});
