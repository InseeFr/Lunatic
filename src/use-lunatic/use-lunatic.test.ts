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
		expect(result.current.pager.page).toBe('1');
		expect(result.current.pager.lastReachedPage).toBe('1');
		expect(result.current.pager.maxPage).toBe('39');
	});
	it('should go to the next page correcly', () => {
		const { result } = renderHook(() => useLunatic(...defaultParams));
		expect(result.current.pager.page).toBe('1');
		expect(result.current.pager.lastReachedPage).toBe('1');
		act(() => {
			result.current.goNextPage();
		});
		expect(result.current.pager.page).toBe('2');
		expect(result.current.pager.lastReachedPage).toBe('2');
	});

	it('should jump to a specific page', () => {
		const params = [
			source as any,
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
		expect(result.current.pager.lastReachedPage).toBe('35.1#1');
		expect(result.current.pager.iteration).toBe(0);
		expect(result.current.pager.subPage).toBe(0);
		expect(result.current.pager.page).toBe('35');
		expect(components[0].id).toBe('kiq5xw5p');
	});
});
