import { describe, expect, test } from 'vitest';
import compose from './compose';

describe('compose', () => {
	const double = (a: number) => a * 2;
	const increment = (a: number) => a + 1;

	test('it should compose methods', () => {
		const doubleThenIncr = compose(double, increment);
		const incrThenDouble = compose(increment, double);
		expect(doubleThenIncr(2)).toBe(5);
		expect(doubleThenIncr(6)).toBe(13);
		expect(incrThenDouble(2)).toBe(6);
		expect(incrThenDouble(4)).toBe(10);
	});
});
