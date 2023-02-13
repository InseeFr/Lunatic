import { describe, expect, test } from 'vitest';
import compose from './compose';

describe('compose', () => {
	const double = (a: number) => a * 2;
	const increment = (a: number) => a + 1;
	const append1 = (a: string, b: string) => a + b;
	const append2 = (a: string, b: string) => a + '2' + b;

	test('it should compose methods', () => {
		const doubleThenIncr = compose(double, increment);
		const incrThenDouble = compose(increment, double);
		expect(doubleThenIncr(2)).toBe(5);
		expect(doubleThenIncr(6)).toBe(13);
		expect(incrThenDouble(2)).toBe(6);
		expect(incrThenDouble(4)).toBe(10);
	});

	test('it should compose methods with additional params', () => {
		const append12 = compose(append1, append2);
		const append21 = compose(append2, append1);
		expect(append12('a', 'base')).toBe('abase2base');
		expect(append21('a', 'base')).toBe('a2basebase');
	});
});
