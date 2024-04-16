import { act, renderHook } from '@testing-library/react-hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useLunatic from './use-lunatic';

import sourceWithoutHierarchy from '../stories/overview/source.json';
import sourceLogement from '../stories/questionnaires/logement/source.json';
import sourceSimpsons from '../stories/questionnaires2023/simpsons/source.json';
import sourceOverview from '../stories/overview/sourceLoop.json';
import dataOverview from '../stories/overview/dataLoop.json';
import sourceCleaningLoop from '../stories/behaviour/cleaning/source-loop.json';
import sourceCleaningResizing from '../stories/behaviour/resizing/source-resizing-cleaning.json';
import type { LunaticData, PageTag } from './type';

const dataFromObject = (o: Record<string, unknown>): LunaticData => {
	return {
		EXTERNAL: {},
		COLLECTED: Object.keys(o).reduce(
			(acc, k) => ({
				...acc,
				[k]: {
					EDITED: null,
					FORCED: null,
					INPUTTED: null,
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
	const defaultParams = [
		sourceSimpsons as any,
		dataFromObject({}),
		{},
	] as const;

	it('should initialize correctly', () => {
		const { result } = renderHook(() => useLunatic(...defaultParams));
		expect(result.current.pager.page).toBe(1);
		expect(result.current.pager.lastReachedPage).toBe('1');
		expect(result.current.pager.maxPage).toBe(41);
	});
	it('should go to the next page correcly', () => {
		const { result } = renderHook(() => useLunatic(...defaultParams));
		expect(result.current.pager.page).toBe(1);
		expect(result.current.pager.lastReachedPage).toBe('1');
		act(() => {
			result.current.goNextPage();
		});
		expect(result.current.pager.page).toBe(2);
		expect(result.current.pager.lastReachedPage).toBe('2');
	});
	it('should jump to a specific page', () => {
		const params = [
			sourceSimpsons as any,
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
		expect(result.current.pager.page).toBe(35);
		expect(components[0].id).toBe('kiq5xw5p');
	});

	describe('Provider', () => {
		it('should not generate a new Provider every render', () => {
			const { result } = renderHook(() => useLunatic(...defaultParams));
			const oldProvider = result.current.Provider;
			act(() => {
				result.current.goNextPage();
			});
			expect(result.current.Provider).toBe(oldProvider);
		});
	});

	describe('overview', () => {
		const lunaticConfigurationWithoutOverview = {
			management: false,
			activeControls: false,
			initialPage: '1' as PageTag,
			getStoreInfo: () => {},
			missing: false,
			shortcut: false,
			activeGoNextForMissing: false,
			showOverview: false,
			filterDescription: true,
		};

		const lunaticConfiguration = {
			...lunaticConfigurationWithoutOverview,
			withOverview: true,
		};

		const advancedQestionnaireData = dataFromObject({ CADR: '1' });

		it('should not calculate overview by default', function () {
			const { result } = renderHook(() =>
				useLunatic(
					sourceLogement as any,
					undefined,
					lunaticConfigurationWithoutOverview
				)
			);
			const overview = result.current.overview;
			expect(overview).toHaveLength(0);
		});
		it('should make the first sequence visible', function () {
			const { result } = renderHook(() =>
				useLunatic(sourceLogement as any, undefined, {
					...lunaticConfiguration,
					lastReachedPage: '1',
				})
			);
			const overview = result.current.overview;
			expect(overview).toHaveLength(11);
			expect(overview[0].reached).toEqual(true);
			expect(overview[1].reached).toEqual(false);
		});
		it('should be empty when no hierarchy', function () {
			const { result } = renderHook(() =>
				useLunatic(
					sourceWithoutHierarchy as any,
					undefined,
					lunaticConfiguration
				)
			);
			expect(result.current.overview).toHaveLength(0);
		});

		describe('with initial data', function () {
			it('should make second sequence visible', function () {
				const { result } = renderHook(() =>
					useLunatic(sourceLogement as any, advancedQestionnaireData, {
						...lunaticConfiguration,
						// hack on initialPage : useLunatic SHOULD find lastReachedPage from COLLECTED data
						initialPage: '1',
						// use lastReachedPage saved by orchestrator
						lastReachedPage: '16',
					})
				);
				const overview = result.current.overview;
				expect(overview).toHaveLength(11);
				expect(overview[0].reached).toEqual(true);
				expect(overview[1].reached).toEqual(true);
			});
		});

		describe('with loop', function () {
			it('should work with loop', async () => {
				const { result } = renderHook(() =>
					useLunatic(
						sourceOverview as any,
						dataOverview.data,
						lunaticConfiguration
					)
				);
				expect(result.current.overview).toMatchSnapshot();
			});
			it('should handle lastReachedPage', async () => {
				const { result } = renderHook(() =>
					useLunatic(sourceOverview as any, dataOverview.data, {
						...lunaticConfiguration,
						lastReachedPage: '11.2#2',
					})
				);
				expect(result.current.overview).toMatchSnapshot();
			});
		});
	});

	describe('cleaning', () => {
		it('should handle cleaning in a loop', () => {
			const { result } = renderHook(() =>
				useLunatic(sourceCleaningLoop as any, undefined, {})
			);
			act(() => {
				result.current.handleChange({ name: 'PRENOM' }, [
					'John',
					'Doe',
					'Marc',
				]);
				result.current.handleChange({ name: 'AGE' }, [18, 18, 18]);
				// Go in the first iteration
				result.current.goNextPage();
				result.current.goNextPage();
			});
			const expectCollectedAgeToEqual = (expectation: unknown[]) => {
				expect(
					(result.current.getData(false).COLLECTED as any).AGE.COLLECTED
				).toEqual(expectation);
			};
			expectCollectedAgeToEqual([18, 18, 18]);
			act(() => {
				result.current.handleChange({ name: 'HIDE_AGE' }, true, {
					iteration: [0],
				});
			});
			expectCollectedAgeToEqual([null, 18, 18]);
		});
	});

	describe('resizing', () => {
		it('should resize after cleaning', () => {
			const spy = vi.fn();
			const { result } = renderHook(() =>
				useLunatic(sourceCleaningResizing as any, undefined, {
					onChange: spy,
				})
			);
			result.current.handleChange({ name: 'NB' }, 3);
			expect(
				(result.current.getData(true).COLLECTED?.PRENOMS as any).COLLECTED
			).toEqual([null, null, null]);
			result.current.handleChange({ name: 'NB' }, 2);
			expect(
				(result.current.getData(true).COLLECTED?.PRENOMS as any).COLLECTED
			).toEqual([null, null]);
		});
	});

	describe('getData()', () => {
		let hookRef: { current: ReturnType<typeof useLunatic> };
		beforeEach(() => {
			const { result } = renderHook(() =>
				useLunatic(sourceSimpsons as any, undefined, {})
			);
			act(() => {
				result.current.handleChange({ name: 'COMMENT' }, 'Mon commentaire');
				result.current.handleChange({ name: 'READY' }, true);
			});
			hookRef = result;
		});
		it('should return every value', () => {
			const data = hookRef.current.getData(false);
			expect(data).toMatchObject({
				COLLECTED: {
					COMMENT: {
						COLLECTED: 'Mon commentaire',
					},
					READY: {
						COLLECTED: true,
					},
				},
			});
			expect(data.COLLECTED && Object.keys(data.COLLECTED)).toHaveLength(109);
			expect(data.CALCULATED && Object.keys(data?.CALCULATED)).toHaveLength(0);
		});
		it('should return calculated values', () => {
			const data = hookRef.current.getData(true);
			expect(data.COLLECTED && Object.keys(data.COLLECTED)).toHaveLength(109);
			expect(data.CALCULATED && Object.keys(data?.CALCULATED)).toHaveLength(33);
		});
		it('should only return requested variables', () => {
			const data = hookRef.current.getData(false, ['COMMENT']);
			expect(data).toMatchObject({
				COLLECTED: {
					COMMENT: {
						COLLECTED: 'Mon commentaire',
					},
				},
			});
			expect(data.COLLECTED && Object.keys(data.COLLECTED)).toHaveLength(1);
		});
	});

	describe('getChangedData()', () => {
		let hookRef: { current: ReturnType<typeof useLunatic> };
		beforeEach(() => {
			const { result } = renderHook(() =>
				useLunatic(sourceSimpsons as any, undefined, { trackChanges: true })
			);
			hookRef = result;
		});
		it('should return every value', () => {
			const data = hookRef.current.getChangedData();
			expect(data.COLLECTED).toEqual({});
		});
		it('should return changes since the last update', () => {
			act(() => {
				hookRef.current.handleChange({ name: 'COMMENT' }, 'Mon commentaire');
				hookRef.current.handleChange({ name: 'READY' }, true);
			});
			expect(hookRef.current.getChangedData()).toMatchObject({
				COLLECTED: {
					COMMENT: {
						COLLECTED: 'Mon commentaire',
					},
					READY: {
						COLLECTED: true,
					},
				},
			});
		});
		it('should reset changes with true parameter', () => {
			act(() => {
				hookRef.current.handleChange({ name: 'COMMENT' }, 'Mon commentaire');
				hookRef.current.handleChange({ name: 'READY' }, true);
			});
			const data = hookRef.current.getChangedData(true);
			expect(data).toMatchObject({
				COLLECTED: {
					COMMENT: {
						COLLECTED: 'Mon commentaire',
					},
					READY: {
						COLLECTED: true,
					},
				},
			});
			expect(hookRef.current.getChangedData().COLLECTED).toEqual({});
		});
		it('should reset changes with resetChanges()', () => {
			act(() => {
				hookRef.current.handleChange({ name: 'COMMENT' }, 'Mon commentaire');
				hookRef.current.handleChange({ name: 'READY' }, true);
			});
			hookRef.current.resetChangedData();
			expect(hookRef.current.getChangedData().COLLECTED).toEqual({});
			act(() => {
				hookRef.current.handleChange({ name: 'READY' }, false);
			});
			expect(hookRef.current.getChangedData().COLLECTED).toMatchObject({
				READY: {
					COLLECTED: false,
				},
			});
		});
	});
});
