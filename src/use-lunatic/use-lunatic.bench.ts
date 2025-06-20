import { act, renderHook } from '@testing-library/react';
import { bench, describe } from 'vitest';

import sourceSimpsons from '../stories/questionnaires/simpsons/source.json';
import sourceSrcv from '../stories/questionnaires/srcv/source.json';
import dataSrcv from '../stories/questionnaires/srcv/data.json';
import { useLunatic } from './use-lunatic';
import { dataFromObject } from '../utils/object';

describe('use-lunatic() perf', () => {
	const defaultParams = [sourceSimpsons, dataFromObject({}), {}] as const;

	bench('normal case', () => {
		const { result } = renderHook(() => useLunatic(...defaultParams));
		act(() => {
			result.current.goNextPage();
		});
	});

	bench('w overview', () => {
		const { result } = renderHook(() =>
			useLunatic(defaultParams[0], defaultParams[1], { withOverview: true })
		);
		act(() => {
			result.current.goNextPage();
		});
	});

	bench('srcv normal case', () => {
		const { result } = renderHook(() =>
			useLunatic(sourceSrcv, defaultParams[1])
		);
		act(() => {
			result.current.goNextPage();
		});
	});
});

describe('use-lunatic() SRCV perf', () => {
	const defaultParams = [sourceSrcv, dataSrcv.data, {}] as const;

	bench('normal case', () => {
		const { result } = renderHook(() => useLunatic(...defaultParams));
		act(() => {
			result.current.goNextPage();
		});
	});

	bench('w overview', () => {
		const { result } = renderHook(() =>
			useLunatic(defaultParams[0], defaultParams[1], { withOverview: true })
		);
		act(() => {
			result.current.goNextPage();
		});
	});
});
