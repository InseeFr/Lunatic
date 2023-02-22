import { describe, expect, test } from 'vitest';
import { incrementPage } from './page';

type BreadCrumItem = {
	label: string;
	disabled: boolean;
	page: '19.2';
	children: BreadCrumItem[];
};

describe('incrementPage', () => {
	const cases = [
		[[1], [5], [2]],
		[
			[1, 1],
			[5, 2],
			[1, 2],
		],
		[[1, 1], [5, 1], [2]],
		[
			[1, 1, 1],
			[5, 2, 1],
			[1, 2],
		],
		[[1, 1, 1], [5, 1, 1], [2]],
	] as const;
	for (const [pages, max, expectation] of cases) {
		test(`it should increment \`${JSON.stringify(
			pages
		)}\` with max \`${JSON.stringify(max)}\` correctly}`, () => {
			expect(incrementPage(pages, max)).toEqual(expectation);
		});
	}
});
