import { act, renderHook } from '@testing-library/react';
import { bench, describe } from 'vitest';

import sourceSimpsons from '../stories/questionnaires/simpsons/source.json';
import sourceSrcv from '../stories/questionnaires/srcv/source.json';
import dataSrcv from '../stories/questionnaires/srcv/data.json';
import { useLunatic } from './use-lunatic';
import { dataFromObject } from '../utils/object';

describe.skip('use-lunatic() perf', () => {
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

	bench(
		'srcv normal case w/o data',
		() => {
			const { result } = renderHook(() =>
				useLunatic(sourceSrcv, defaultParams[1])
			);
			act(() => {
				result.current.goNextPage();
			});
		},
		{ iterations: 1 }
	);
});

describe.skip('use-lunatic() SRCV perf', () => {
	const defaultParams = [sourceSrcv, dataSrcv.data, {}] as const;

	bench(
		'normal case w data',
		() => {
			const { result } = renderHook(() => useLunatic(...defaultParams));
			act(() => {
				result.current.goNextPage();
			});
		},
		{ iterations: 1, time: 1 }
	);

	bench(
		'w overview w/o data',
		() => {
			const { result } = renderHook(() =>
				useLunatic(defaultParams[0], dataFromObject({}), { withOverview: true })
			);
			act(() => {
				result.current.goNextPage();
			});
		},
		{ iterations: 1, time: 1 }
	);

	bench(
		'w overview w data',
		() => {
			const { result } = renderHook(() =>
				useLunatic(defaultParams[0], defaultParams[1], { withOverview: true })
			);
			act(() => {
				result.current.goNextPage();
			});
		},
		{ iterations: 1, time: 1 }
	);
});
