import { describe, expect, it } from 'vitest';
import { filterCombinations, getCombinations } from './combinations';

describe('combinations utils', () => {
	it('should create square combinations', () => {
		expect(getCombinations(1)).toStrictEqual([[0, 0]]);
		expect(getCombinations(2)).toStrictEqual([
			[0, 0],
			[1, 0],
			[0, 1],
			[1, 1],
		]);
		expect(getCombinations(3)).toStrictEqual([
			[0, 0],
			[1, 0],
			[2, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[0, 2],
			[1, 2],
			[2, 2],
		]);
	});

	it('should filter combinations paiwise link in Loop', () => {
		const combinations = getCombinations(3);

		expect(
			combinations.filter((combination) =>
				filterCombinations({ combination, iteration: 0, readonly: false })
			)
		).toStrictEqual([
			[1, 0],
			[2, 0],
		]);

		expect(
			combinations.filter((combination) =>
				filterCombinations({ combination, iteration: 1, readonly: false })
			)
		).toStrictEqual([[2, 1]]);
	});

	it('should filter combinations paiwise link not in Loop', () => {
		const combinations = getCombinations(3);
		expect(
			combinations.filter((combination) =>
				filterCombinations({
					combination,
					iteration: undefined,
					readonly: false,
				})
			)
		).toStrictEqual([
			[1, 0],
			[2, 0],
			[2, 1],
		]);
	});

	it('should filter combinations for readonly paiwise link in Loop', () => {
		const combinations = getCombinations(3);

		expect(
			combinations.filter((combination) =>
				filterCombinations({ combination, iteration: 0, readonly: true })
			)
		).toStrictEqual([]);

		expect(
			combinations.filter((combination) =>
				filterCombinations({ combination, iteration: 1, readonly: true })
			)
		).toStrictEqual([[0, 1]]);

		expect(
			combinations.filter((combination) =>
				filterCombinations({ combination, iteration: 2, readonly: true })
			)
		).toStrictEqual([
			[0, 2],
			[1, 2],
		]);
	});

	it('should filter combinations for readonly paiwise link not in Loop', () => {
		const combinations = getCombinations(3);
		expect(
			combinations.filter((combination) =>
				filterCombinations({
					combination,
					iteration: undefined,
					readonly: true,
				})
			)
		).toStrictEqual([
			[0, 1],
			[0, 2],
			[1, 2],
		]);
	});
});
