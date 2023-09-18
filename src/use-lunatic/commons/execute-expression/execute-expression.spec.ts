import { describe, expect, test } from 'vitest';
import executeExpression from './execute-expression';

describe('executeVTL', () => {
	const cases = [
		['"Hello World"', {}, 'Hello World'],
		['1', {}, 1],
		['true', {}, true],
		['this is a string', {}, 'this is a string'],
		['"Hello" || " World"', {}, 'Hello World'],
		['"Hello" || W', { W: ' World' }, 'Hello World'],
		['W = 2', { W: 2 }, true],
		['W = 1', { W: 2 }, false],
		['cast(AGE, integer)', { AGE: '18' }, 18],
		['count(V)', { V: [1, 2, 3] }, 3],
		['(READY)', { READY: true }, true],
	] as const;
	for (const [expression, bindings, expectation] of cases) {
		test(`it should convert \`${expression}\` into ${JSON.stringify(
			expectation
		)}`, () => {
			expect(executeExpression(bindings, expression, 'VTL', ['VTL'])).toBe(
				expectation
			);
		});
	}
});
