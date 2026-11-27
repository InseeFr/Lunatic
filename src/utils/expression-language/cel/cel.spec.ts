import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getExpressionVariables as vars, evaluateCEL } from './cel';

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

describe('evaluateCEL', () => {
	// Tests pour les expressions arithmétiques simples
	it('should evaluate basic arithmetic expressions', () => {
		console.log(evaluateCEL<number>('1 + 2', {}));
		expect(evaluateCEL<number>('1 + 2', {})).toBe(3);
		expect(evaluateCEL<number>('10 - 3', {})).toBe(7);
		expect(evaluateCEL<number>('4 * 5', {})).toBe(20);
		expect(evaluateCEL<number>('20 / 4', {})).toBe(5);
		expect(evaluateCEL<number>('10 % 3', {})).toBe(1);
	});

	// Tests pour les expressions logiques
	it('should evaluate logical expressions', () => {
		expect(evaluateCEL<boolean>('true && false', {})).toBe(false);
		expect(evaluateCEL<boolean>('true || false', {})).toBe(true);
		expect(evaluateCEL<boolean>('!true', {})).toBe(false);
		expect(evaluateCEL<boolean>('5 > 3', {})).toBe(true);
		expect(evaluateCEL<boolean>('5 < 3', {})).toBe(false);
		expect(evaluateCEL<boolean>('5 == 5', {})).toBe(true);
		expect(evaluateCEL<boolean>('5 != 3', {})).toBe(true);
	});

	// Tests pour l'accès aux variables
	it('should evaluate expressions with variables', () => {
		expect(evaluateCEL<number>('x + y', { x: 5, y: 3 })).toBe(8);
		expect(evaluateCEL<boolean>('x > y', { x: 10, y: 5 })).toBe(true);
		expect(evaluateCEL<string>('name', { name: 'Alice' })).toBe('Alice');
	});

	// Tests pour les fonctions CEL
	it('should evaluate CEL functions', () => {
		expect(evaluateCEL<number>('size([1, 2, 3])', {})).toBe(3);
		expect(evaluateCEL<number>('[1, 2, 3].size()', {})).toBe(3);
	});

	// Tests pour les macros CEL
	it('should evaluate CEL macros', () => {
		const items = [1, 2, 3, 4, 5];
		expect(evaluateCEL<boolean>('items.all(x, x > 0)', { items })).toBe(true);
		expect(evaluateCEL<boolean>('items.exists(x, x > 3)', { items })).toBe(
			true
		);
		// exact one element
		expect(evaluateCEL<boolean>('items.exists_one(x, x > 3)', { items })).toBe(
			false
		);
		expect(evaluateCEL<boolean>('items.exists_one(x, x == 3)', { items })).toBe(
			true
		);
		expect(evaluateCEL<number[]>('items.filter(x, x > 2)', { items })).toEqual([
			3, 4, 5,
		]);
		expect(evaluateCEL<number[]>('items.map(x, x * 2.0)', { items })).toEqual([
			2, 4, 6, 8, 10,
		]);
	});

	// Tests pour les expressions imbriquées
	it('should evaluate nested expressions', () => {
		const data = { user: { name: 'Alice', age: 30 } };
		expect(evaluateCEL<boolean>('user.age > 25', data)).toBe(true);
		expect(evaluateCEL<string>('user.name', data)).toBe('Alice');
		expect(evaluateCEL<boolean>('size(user.name) > 3', data)).toBe(true);
	});

	// Tests pour les expressions ternaires
	it('should evaluate ternary expressions', () => {
		expect(evaluateCEL<string>('true ? "yes" : "no"', {})).toBe('yes');
		expect(evaluateCEL<string>('false ? "yes" : "no"', {})).toBe('no');
		expect(evaluateCEL<number>('x > 0 ? x : 0', { x: -5 })).toBe(0);
	});

	// Tests pour les listes et les maps
	it('should evaluate list and map literals', () => {
		expect(evaluateCEL<number[]>('[1, 2, 3]', {})).toEqual([1, 2, 3]);
		expect(evaluateCEL<Record<string, number>>('{"a": 1, "b": 2}', {})).toEqual(
			{ a: 1, b: 2 }
		);
		expect(evaluateCEL<number>('[1, 2, 3][0]', {})).toBe(1);
	});

	// Tests pour les opérateurs unaires
	it('should evaluate unary operators', () => {
		expect(evaluateCEL<boolean>('!false', {})).toBe(true);
	});

	// Tests pour les expressions complexes
	it('should evaluate complex expressions', () => {
		const data = {
			users: [
				{ name: 'Alice', age: 30 },
				{ name: 'Bob', age: 25 },
			],
		};
		expect(evaluateCEL<boolean>('users.exists(u, u.age > 25)', data)).toBe(
			true
		);
		expect(
			evaluateCEL<number>('users.filter(u, u.age > 25).size()', data)
		).toBe(1);
		expect(evaluateCEL<string[]>('users.map(u, u.name)', data)).toEqual([
			'Alice',
			'Bob',
		]);
	});

	// Tests pour les cas limites
	it('should handle edge cases', () => {
		// Expression avec une variable non définie dans les bindings
		// Note: CEL devrait lancer une erreur si une variable n'est pas définie
		expect(() => evaluateCEL<number>('x + y', { x: 5 })).toThrow();

		// Expression vide ou invalide
		// Note: CEL devrait lancer une erreur pour les expressions invalides
		expect(() => evaluateCEL<number>('', {})).toThrow();
	});
});

describe('list functions', () => {
	it('should handle custom function for list', () => {
		expect(
			evaluateCEL<string>('PRENOM[0]', {
				PRENOM: ['Alice', 'Bob'],
			})
		).toEqual('Alice');
		expect(
			evaluateCEL<string>('PRENOM.first()', {
				PRENOM: ['Alice', 'Bob'],
			})
		).toEqual('Alice');
		expect(
			evaluateCEL<string>('PRENOM.last()', {
				PRENOM: ['Alice', 'Bob'],
			})
		).toEqual('Bob');
	});

	it('should return null when calling first() on an empty list', () => {
		expect(evaluateCEL<null>('PRENOM.first()', { PRENOM: [] })).toBeNull();
	});

	it('should handle distinct()', () => {
		expect(
			evaluateCEL<string[]>('PRENOM.distinct()', {
				PRENOM: ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob'],
			})
		).toEqual(['Alice', 'Bob', 'Charlie']);
		expect(evaluateCEL<unknown[]>('PRENOM.distinct()', { PRENOM: [] })).toEqual(
			[]
		);
		expect(evaluateCEL<number[][]>('[[1], [1], [2]].distinct()', {})).toEqual([
			[1],
			[2],
		]);
	});

	it('should handle reverse()', () => {
		const PRENOM = ['Alice', 'Bob', 'Charlie'];
		expect(evaluateCEL<string[]>('PRENOM.reverse()', { PRENOM })).toEqual([
			'Charlie',
			'Bob',
			'Alice',
		]);
		// should not mutate the source list
		expect(PRENOM).toEqual(['Alice', 'Bob', 'Charlie']);
		expect(evaluateCEL<unknown[]>('PRENOM.reverse()', { PRENOM: [] })).toEqual(
			[]
		);
	});

	it('should handle slice()', () => {
		const PRENOM = ['Alice', 'Bob', 'Charlie', 'David'];
		expect(evaluateCEL<string[]>('PRENOM.slice(1, 3)', { PRENOM })).toEqual([
			'Bob',
			'Charlie',
		]);
		expect(evaluateCEL<string[]>('PRENOM.slice(1, 1)', { PRENOM })).toEqual([]);
		expect(evaluateCEL<string[]>('PRENOM.slice(0, 4)', { PRENOM })).toEqual(
			PRENOM
		);
	});

	it('should throw on invalid slice() arguments', () => {
		const PRENOM = ['Alice', 'Bob', 'Charlie'];
		expect(() => evaluateCEL('PRENOM.slice(2, 1)', { PRENOM })).toThrow();
		expect(() => evaluateCEL('PRENOM.slice(0, 5)', { PRENOM })).toThrow();
		expect(() => evaluateCEL('PRENOM.slice(-1, 2)', { PRENOM })).toThrow();
	});

	it('should handle flatten()', () => {
		expect(evaluateCEL<unknown[]>('[1, [2, [3, 4]]].flatten()', {})).toEqual([
			1,
			2,
			[3, 4],
		]);
		expect(evaluateCEL<unknown[]>('[1, [2, [3, [4]]]].flatten(2)', {})).toEqual(
			[1, 2, 3, [4]]
		);
		expect(evaluateCEL<unknown[]>('[1, [2]].flatten(0)', {})).toEqual([1, [2]]);
		expect(evaluateCEL<unknown[]>('[].flatten()', {})).toEqual([]);
	});

	it('should throw on flatten() with a negative depth', () => {
		expect(() => evaluateCEL('[1, [2]].flatten(-1)', {})).toThrow();
	});

	it('should handle sort()', () => {
		expect(evaluateCEL<number[]>('[3, 1, 2].sort()', {})).toEqual([1, 2, 3]);
		expect(
			evaluateCEL<string[]>('PRENOM.sort()', {
				PRENOM: ['Charlie', 'Alice', 'Bob'],
			})
		).toEqual(['Alice', 'Bob', 'Charlie']);
		expect(evaluateCEL<number[]>('[2.5, 1.5, 3.5].sort()', {})).toEqual([
			1.5, 2.5, 3.5,
		]);
		expect(evaluateCEL<unknown[]>('[].sort()', {})).toEqual([]);
	});

	it('should not mutate the source list when calling sort()', () => {
		const NOMBRES = [3, 1, 2];
		evaluateCEL<number[]>('NOMBRES.sort()', { NOMBRES });
		expect(NOMBRES).toEqual([3, 1, 2]);
	});

	it('should throw when sort() is called on non-comparable elements', () => {
		expect(() => evaluateCEL('VALUES.sort()', { VALUES: [1, 'a'] })).toThrow();
		expect(() => evaluateCEL('[[1], [2]].sort()', {})).toThrow();
	});

	it('should compare numbers of different types as equal', () => {
		expect(evaluateCEL<unknown[]>('[1, 1.0].distinct()', {})).toHaveLength(1);
	});
});

describe('now()', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2026-07-23T15:42:10.123Z'));
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('should return the current instant in UTC (RFC 3339) with time and milliseconds', () => {
		expect(evaluateCEL<string>('now()', {})).toEqual(
			'2026-07-23T15:42:10.123Z'
		);
	});

	it('should be usable with the timestamp function', () => {
		expect(
			evaluateCEL<boolean>(
				'timestamp(now()) == timestamp("2026-07-23T15:42:10.123Z")',
				{}
			)
		).toBe(true);
		expect(evaluateCEL<number>('timestamp(now()).getFullYear()', {})).toEqual(
			2026
		);
		expect(evaluateCEL<number>('timestamp(now()).getHours()', {})).toEqual(15);
		expect(evaluateCEL<number>('timestamp(now()).getMinutes()', {})).toEqual(
			42
		);
	});

	it('should follow the system clock', () => {
		vi.setSystemTime(new Date('2026-07-23T23:59:59.999Z'));
		expect(evaluateCEL<string>('now()', {})).toEqual(
			'2026-07-23T23:59:59.999Z'
		);
	});

	it('should be comparable with a past or future date', () => {
		expect(
			evaluateCEL<boolean>(
				'timestamp("2026-01-01T00:00:00Z") < timestamp(now())',
				{}
			)
		).toBe(true);
		expect(
			evaluateCEL<boolean>(
				'timestamp("2027-01-01T00:00:00Z") > timestamp(now())',
				{}
			)
		).toBe(true);
		console.log(evaluateCEL('(now())', {}));
	});
});

describe('sum()', () => {
	it('should sum a list of doubles', () => {
		expect(evaluateCEL<number>('[1.5, 2.5, 3.0].sum()', {})).toEqual(7);
		expect(evaluateCEL<number>('PRIX.sum()', { PRIX: [10.5, 20.25] })).toEqual(
			30.75
		);
	});

	it('should sum a list of ints', () => {
		expect(evaluateCEL<number>('[1, 2, 3].sum()', {})).toEqual(6);
	});

	it('should promote to double when the list mixes ints and doubles', () => {
		expect(evaluateCEL<number>('[1, 2.5].sum()', {})).toEqual(3.5);
	});

	it('should return 0 for an empty list', () => {
		expect(evaluateCEL<number>('PRIX.sum()', { PRIX: [] })).toEqual(0);
	});

	it('should support the global call syntax', () => {
		expect(evaluateCEL<number>('sum([1.5, 2.5])', {})).toEqual(4);
	});

	it('should handle negative numbers', () => {
		expect(evaluateCEL<number>('[-1.5, 1.5, 2.0].sum()', {})).toEqual(2);
	});

	it('should throw on non-numeric lists', () => {
		expect(() => evaluateCEL('["a", "b"].sum()', {})).toThrow();
		expect(() => evaluateCEL('LIST.sum()', { LIST: [1, 'a'] })).toThrow();
	});
});

describe('min() / max()', () => {
	it('should return the minimum of a list of doubles', () => {
		expect(evaluateCEL<number>('[3.5, 1.25, 2.0].min()', {})).toEqual(1.25);
		expect(evaluateCEL<number>('PRIX.min()', { PRIX: [10.5, 20.25] })).toEqual(
			10.5
		);
	});

	it('should return the maximum of a list of doubles', () => {
		expect(evaluateCEL<number>('[3.5, 1.25, 2.0].max()', {})).toEqual(3.5);
		expect(evaluateCEL<number>('PRIX.max()', { PRIX: [10.5, 20.25] })).toEqual(
			20.25
		);
	});

	it('should handle lists of ints', () => {
		expect(evaluateCEL<number>('[3, 1, 2].min()', {})).toEqual(1);
		expect(evaluateCEL<number>('[3, 1, 2].max()', {})).toEqual(3);
	});

	it('should compare ints and doubles in a mixed list', () => {
		expect(evaluateCEL<number>('[1, 2.5, 0.5].min()', {})).toEqual(0.5);
		expect(evaluateCEL<number>('[1, 2.5, 0.5].max()', {})).toEqual(2.5);
	});

	it('should handle negative numbers', () => {
		expect(evaluateCEL<number>('[-1.5, -3.5, 2.0].min()', {})).toEqual(-3.5);
		expect(evaluateCEL<number>('[-1.5, -3.5, 2.0].max()', {})).toEqual(2);
	});

	it('should handle a single-element list', () => {
		expect(evaluateCEL<number>('[4.2].min()', {})).toEqual(4.2);
		expect(evaluateCEL<number>('[4.2].max()', {})).toEqual(4.2);
	});

	it('should return null for an empty list', () => {
		expect(evaluateCEL('PRIX.min()', { PRIX: [] })).toBeNull();
		expect(evaluateCEL('PRIX.max()', { PRIX: [] })).toBeNull();
	});

	it('should support the global call syntax', () => {
		expect(evaluateCEL<number>('min([1.5, 2.5])', {})).toEqual(1.5);
		expect(evaluateCEL<number>('max([1.5, 2.5])', {})).toEqual(2.5);
	});

	it('should throw on non-numeric lists', () => {
		expect(() => evaluateCEL('["a", "b"].min()', {})).toThrow();
		expect(() => evaluateCEL('LIST.max()', { LIST: [1, 'a'] })).toThrow();
	});
});

describe('null case', () => {
	it('should return other value', () => {
		expect(
			evaluateCEL('PRENOM == null ? "test" : PRENOM', {
				PRENOM: null,
			})
		).toEqual('test');
	});
});
