import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks';
import useLunatic from './use-lunatic';

import source from '../stories/questionnaires/simpsons/source.json';
import { LunaticData } from './type';

const dataFromObject = (o: Record<string, unknown>): LunaticData => {
	return {
		EXTERNAL: {},
		COLLECTED: Object.keys(o).reduce(
			(acc, k) => ({
				...acc,
				[k]: {
					EDITED: null,
					FORCED: null,
					INPUTED: null,
					PREVIOUS: null,
					COLLECTED: o[k],
				},
			}),
			{}
		),
		CALCULATED: {},
	};
};

describe('use-lunatic()', () => {
	const defaultParams = [source as any, dataFromObject({}), {}] as const;

	it('should initialize correcly', () => {
		const { result } = renderHook(() => useLunatic(...defaultParams));
		expect(result.current.pager.page).toEqual([1]);
		expect(result.current.pager.lastReachedPage).toEqual({
			page: [1],
			iteration: [],
		});
		expect(result.current.pager.maxPage).toEqual([39]);
	});
	it('should go to the next page correctly', () => {
		const { result } = renderHook(() => useLunatic(...defaultParams));
		expect(result.current.pager.page).toEqual([1]);
		expect(result.current.pager.lastReachedPage).toEqual({
			page: [1],
			iteration: [],
		});
		act(() => {
			result.current.goNextPage();
		});
		expect(result.current.pager.page).toEqual([2]);
		expect(result.current.pager.lastReachedPage).toEqual({
			page: [2],
			iteration: [],
		});
	});

	it('should jump to a specific page', () => {
		const params = [
			source,
			dataFromObject({
				COMMENT: 'Hello world',
				READY: true,
				NAME_CHAR: ['a', 'b'],
			}),
			{
				initialPage: '35.1#1',
			},
		] as const;
		const { result } = renderHook(() => useLunatic(...params));
		const components = result.current.getComponents();
		expect(result.current.pager.lastReachedPage).toEqual({
			page: [35, 1],
			iteration: [0],
		});
		expect(result.current.pager.iteration).toEqual([0]);
		expect(result.current.pager.page).toEqual([35, 1]);
		expect(components[0].id).toEqual('kiq5xw5p');
	});
});
