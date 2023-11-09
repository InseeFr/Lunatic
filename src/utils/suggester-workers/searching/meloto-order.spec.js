import { describe, it, expect } from 'vitest';
import { value, sortWithMeloto } from './sort-with-meloto';

describe('meloto', function () {
	it('value', function () {
		const score = value({ suggestion: { label: 'otat' } }, ['tat']);
		const expected = (4 - 1) / 4;
		expect(score).toEqual(expected);
	});

	it('value2', function () {
		const score = value({ suggestion: { label: 'otatxu' } }, ['tat', 'xu']);
		const expected = (6 - 1) / 6 + ((6 - 4) / 6) * 0.5;
		expect(score).toEqual(expected);
	});

	it('sort', function () {
		const entities = [
			{ suggestion: { label: 'after culture', id: 1 }, score: 1 },
			{ suggestion: { label: 'culture before', id: 2 }, score: 1 },
		];

		sortWithMeloto(entities, ['culture']);
		expect(entities[0].suggestion.id).toEqual(2);
		expect(entities[1].suggestion.id).toEqual(1);
	});

	it('sort2', function () {
		const entities = [
			{ suggestion: { label: 'after after culture', id: 1 }, score: 1 },
			{ suggestion: { label: 'after culture before', id: 2 }, score: 1 },
			{ suggestion: { label: 'culture before before', id: 3 }, score: 1 },
		];

		sortWithMeloto(entities, ['cultu']);
		expect(entities[0].suggestion.id).toEqual(3);
		expect(entities[1].suggestion.id).toEqual(2);
		expect(entities[2].suggestion.id).toEqual(1);
	});
});
