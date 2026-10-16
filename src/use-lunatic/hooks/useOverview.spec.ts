import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import source from '../../stories/behaviour/overview/source.json';
import { useLunatic } from '../use-lunatic';

import { dataFromObject } from '../../utils/object';

describe('use-overview test with useLunatic()', () => {
	it('should initialize correctly with all filters active (without data)', () => {
		const params = [
			source as any,
			dataFromObject({}),
			{ withOverview: true },
		] as const;
		const { result } = renderHook(() => useLunatic(...params));
		expect(result.current.overview.length).toBe(3);
	});

	it('should initialize correctly with all filters active (with data)', () => {
		const params = [
			source as any,
			dataFromObject({
				READY: true,
			}),
			{ withOverview: true },
		] as const;

		const { result } = renderHook(() => useLunatic(...params));
		expect(result.current.overview.length).toBe(9);
	});

	it('should show filtered items when activeFilters is NONE', () => {
		const params = [
			source as any,
			dataFromObject({}),
			{ withOverview: true, activeFilters: 'NONE' },
		] as const;

		const { result } = renderHook(() => useLunatic(...params));
		// All elements have to be presents
		expect(result.current.overview.length).toBe(9);
	});
});
