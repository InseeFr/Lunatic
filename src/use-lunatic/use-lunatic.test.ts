import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import sourceLogement from '../stories/questionnaires/logement/source.json';
import sourceSimpsons from '../stories/questionnaires/simpsons/source.json';
import sourceOverview from '../stories/behaviour/overview/sourceLoop.json';
import sourceCheckboxGroup from '../stories/checkbox/sourceGroup.json';
import sourceRoundabout from '../stories/roundabout/source.json';
import sourcePaginatedLoop from '../stories/loop/source-paginated.json';
import sourceCleaningLoop from '../stories/behaviour/cleaning/source-loop.json';
import sourceCleaningResizing from '../stories/behaviour/resizing/source-resizing-cleaning.json';
import type { LunaticSource, PageTag } from './type';
import { useLunatic } from './use-lunatic';
import { useCallback } from 'react';
import { dataFromObject } from '../utils/object';

describe('use-lunatic()', () => {
	const defaultParams = [sourceSimpsons, dataFromObject({}), {}] as const;

	it('should initialize correctly', () => {
		const { result } = renderHook(() => useLunatic(...defaultParams));
		expect(result.current.pager.page).toBe(1);
		expect(result.current.pager.lastReachedPage).toBe('1');
		expect(result.current.pager.maxPage).toBe(40);
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
			sourceSimpsons,
			dataFromObject({
				COMMENT: 'Hello world',
				READY: true,
				NB_CHAR: 2,
				NAME_CHAR: ['a', 'b'],
			}),
			{
				initialPage: '38.1#1',
			},
		] as const;
		const { result } = renderHook(() => useLunatic(...params));
		const components = result.current.getComponents();
		expect(result.current.pager.lastReachedPage).toBe('38.1#1');
		expect(result.current.pager.iteration).toBe(0);
		expect(result.current.pager.subPage).toBe(0);
		expect(result.current.pager.page).toBe(38);
		expect(components[0].id).toBe('kiq5xw5p');
	});

	describe('handleChange()', () => {
		it('should change variable value', () => {
			const { result } = renderHook(() => useLunatic(...defaultParams));
			act(() => {
				result.current.handleChanges([
					{
						name: 'COMMENT',
						value: 'Mon commentaire',
					},
				]);
			});
			act(() => {
				expect(
					result.current.getData(false, ['COMMENT']).COLLECTED!.COMMENT
						.COLLECTED
				).toBe('Mon commentaire');
			});
		});
		it('should ignore iteration for scalar value', () => {
			const { result } = renderHook(() => useLunatic(...defaultParams));
			act(() => {
				result.current.handleChanges([
					{
						name: 'COMMENT',
						value: 'Mon commentaire 2',
						iteration: [1],
						ignoreIterationOnScalar: true,
					},
				]);
			});
			act(() => {
				expect(
					result.current.getData(false, ['COMMENT']).COLLECTED!.COMMENT
						.COLLECTED
				).toBe('Mon commentaire 2');
			});
		});
	});

	describe('Provider', () => {
		it('should not generate a new Provider every render', () => {
			const { result } = renderHook(() => {
				const missingStrategy = useCallback(() => {}, []);
				return useLunatic(sourceSimpsons, undefined, {
					management: false,
					missing: false,
					missingStrategy,
					shortcut: false,
					missingShortcut: { dontKnow: '1', refused: '2' },
					dontKnowButton: 'DK',
					refusedButton: 'RF',
					componentsOptions: {
						detailAlwaysDisplayed: false,
						disableRosterForLoopDeleteRowButton: false,
					},
				});
			});

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
					sourceLogement,
					undefined,
					lunaticConfigurationWithoutOverview
				)
			);
			const overview = result.current.overview;
			expect(overview).toHaveLength(0);
		});
		it('should make the first sequence visible', function () {
			const { result } = renderHook(() =>
				useLunatic(sourceLogement, undefined, {
					...lunaticConfiguration,
				})
			);
			const overview = result.current.overview;
			expect(overview).toHaveLength(11);
			expect(overview[0].reached).toEqual(true);
			expect(overview[1].reached).toEqual(false);
		});
		it('should be empty when no hierarchy', function () {
			const { result } = renderHook(() =>
				useLunatic(sourceCheckboxGroup, undefined, lunaticConfiguration)
			);
			expect(result.current.overview).toHaveLength(0);
		});

		describe('with initial data', function () {
			it('should make second sequence visible', function () {
				const { result } = renderHook(() =>
					useLunatic(sourceLogement, advancedQestionnaireData, {
						...lunaticConfiguration,
						initialPage: '16',
					})
				);
				const overview = result.current.overview;
				expect(overview).toHaveLength(11);
				expect(overview[0].reached).toEqual(true);
				expect(overview[1].reached).toEqual(true);
			});
		});

		describe('with loop', function () {
			const data = dataFromObject({
				T_NHAB: 3,
				T_PRENOM: ['Quentin', 'Luna', 'Paul'],
			});

			it('should work with loop', async () => {
				const { result } = renderHook(() =>
					useLunatic(sourceOverview, data, lunaticConfiguration)
				);

				// 4 sequences, and we loop twice on the second one
				expect(result.current.overview.length).toBe(5);
				expect(result.current.overview[0].label).toBe(
					'I - Habitants du logement'
				);
				expect(result.current.overview[0].page).toBe('1');
				expect(result.current.overview[1].label).toBe(
					'II - Boucle sur séquence pour  Luna (qui filtre la première itération)'
				);
				expect(result.current.overview[1].page).toBe('4.1#2');
				expect(result.current.overview[2].label).toBe(
					'II - Boucle sur séquence pour  Paul (qui filtre la première itération)'
				);
				expect(result.current.overview[2].page).toBe('4.1#3');

				// 3rd sequence has only one subsequence, and we loop over it
				expect(result.current.overview[3].children.length).toBe(2);
				expect(result.current.overview[3].children[0].page).toBe('6.1#2');
				expect(result.current.overview[3].children[1].page).toBe('6.1#3');

				// It would be nice to test that each label is correct, currently we have issue about expression execution in subsequence in tests only.
			});
			it('should handle initialPage', async () => {
				const { result } = renderHook(() =>
					useLunatic(sourceOverview, data, {
						...lunaticConfiguration,
						initialPage: '6.1#2',
					})
				);

				// 4 sequences, and we loop twice on the second one
				expect(result.current.overview.length).toBe(5);
				expect(result.current.overview[1].reached).toBe(true);
				expect(result.current.overview[3].children[0].reached).toBe(true);
				expect(result.current.overview[3].children[1].reached).toBe(false);
				expect(result.current.overview[4].reached).toBe(false);

				expect(result.current.overview[3].current).toBe(true);
				expect(result.current.overview[3].children[0].current).toBe(true);
			});
		});
	});

	describe('disable filters', () => {
		const lunaticConfigurationWithoutDisableFilters = {
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

		it('should filter out some components by default', function () {
			const { result } = renderHook(() =>
				useLunatic(
					sourceLogement,
					undefined,
					lunaticConfigurationWithoutDisableFilters
				)
			);
			act(() => result.current.goToPage({ page: '3' }));
			const currentPage = result.current.pageTag;
			expect(currentPage).not.toBe('3');
		});
		it('should filter out some components when false', function () {
			const { result } = renderHook(() =>
				useLunatic(sourceLogement, undefined, {
					...lunaticConfigurationWithoutDisableFilters,
					disableFilters: false,
				})
			);
			act(() => result.current.goToPage({ page: '3' }));
			const currentPage = result.current.pageTag;
			expect(currentPage).not.toBe('3');
		});
		it('should not filter any component when true', function () {
			const { result } = renderHook(() =>
				useLunatic(sourceLogement, undefined, {
					...lunaticConfigurationWithoutDisableFilters,
					disableFilters: true,
				})
			);
			act(() => result.current.goToPage({ page: '3' }));
			const currentPage = result.current.pageTag;
			expect(currentPage).toBe('3');

			const components = result.current.getComponents();
			expect(components.length).toBe(1);
		});
	});

	describe('cleaning', () => {
		it('should handle cleaning in a loop', () => {
			const { result } = renderHook(() =>
				useLunatic(sourceCleaningLoop, undefined)
			);
			act(() => {
				result.current.handleChanges([
					{
						name: 'PRENOM',
						value: ['John', 'Doe', 'Marc'],
					},
					{ name: 'AGE', value: [18, 18, 18] },
				]);
				// Go in the first iteration
				result.current.goNextPage();
				result.current.goNextPage();
			});
			const expectCollectedAgeToEqual = (expectation: unknown[]) => {
				expect(result.current.getData(false).COLLECTED?.AGE.COLLECTED).toEqual(
					expectation
				);
			};
			expectCollectedAgeToEqual([18, 18, 18]);
			act(() => {
				result.current.handleChanges([
					{
						name: 'HIDE_AGE',
						value: true,
						iteration: [0],
					},
				]);
			});
			expectCollectedAgeToEqual([null, 18, 18]);
		});
	});

	describe('resizing', () => {
		it('should resize after cleaning', () => {
			const spy = vi.fn();
			const { result } = renderHook(() =>
				useLunatic(sourceCleaningResizing, undefined, {
					onChange: spy,
				})
			);
			act(() => result.current.handleChanges([{ name: 'NB', value: 3 }]));
			expect(
				result.current.getData(true).COLLECTED?.PRENOMS?.COLLECTED
			).toEqual([null, null, null]);
			act(() => result.current.handleChanges([{ name: 'NB', value: 2 }]));
			expect(
				result.current.getData(true).COLLECTED?.PRENOMS?.COLLECTED
			).toEqual([null, null]);
		});
	});

	describe('getData()', () => {
		let hookRef: { current: ReturnType<typeof useLunatic> };
		beforeEach(() => {
			const { result } = renderHook(() =>
				useLunatic(sourceSimpsons, undefined, {})
			);
			act(() => {
				result.current.handleChanges([
					{
						name: 'COMMENT',
						value: 'Mon commentaire',
					},
				]);
				result.current.handleChanges([{ name: 'READY', value: true }]);
			});
			hookRef = result;
		});
		it('should return every value', () => {
			expect(hookRef.current.getData(false)).toMatchSnapshot();
		});
		it('should return calculated values', () => {
			expect(hookRef.current.getData(true)).toMatchSnapshot();
		});
		it('should only return requested variables', () => {
			expect(hookRef.current.getData(false, ['COMMENT'])).toMatchSnapshot();
		});
	});

	describe('getChangedData()', () => {
		let hookRef: { current: ReturnType<typeof useLunatic> };
		beforeEach(() => {
			const { result } = renderHook(() =>
				useLunatic(sourceSimpsons, undefined, { trackChanges: true })
			);
			hookRef = result;
		});
		it('should return every value', () => {
			const data = hookRef.current.getChangedData();
			expect(data.COLLECTED).toEqual({});
		});
		it('should return changes since the last update', () => {
			act(() => {
				hookRef.current.handleChanges([
					{ name: 'COMMENT', value: 'Mon commentaire' },
					{ name: 'READY', value: true },
				]);
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
				hookRef.current.handleChanges([
					{ name: 'COMMENT', value: 'Mon commentaire' },
				]);
				hookRef.current.handleChanges([{ name: 'READY', value: true }]);
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
				hookRef.current.handleChanges([
					{
						name: 'COMMENT',
						value: 'Mon commentaire',
					},
					{ name: 'READY', value: true },
				]);
			});
			hookRef.current.resetChangedData();
			expect(hookRef.current.getChangedData().COLLECTED).toEqual({});
			act(() => {
				hookRef.current.handleChanges([{ name: 'READY', value: false }]);
			});
			expect(hookRef.current.getChangedData().COLLECTED).toMatchObject({
				READY: {
					COLLECTED: false,
				},
			});
		});
	});

	describe('pageHasResponse', () => {
		it('should detect change on a field', () => {
			const { result } = renderHook(() =>
				useLunatic(sourceCheckboxGroup, undefined, {})
			);
			act(() => {
				result.current.handleChanges([{ name: 'NATIO1N1', value: true }]);
			});
			expect(result.current.hasPageResponse()).toBeTruthy();
		});
		it('should not detect unchecked box has a response', () => {
			const { result } = renderHook(() =>
				useLunatic(sourceCheckboxGroup, undefined, {})
			);
			act(() => {
				result.current.handleChanges([{ name: 'NATIO1N1', value: false }]);
			});
			expect(result.current.hasPageResponse()).toBeFalsy();
		});
	});

	describe('getNextPageWithoutResponse()', () => {
		const sourceThreePages: LunaticSource = {
			maxPage: '3',
			components: [
				{
					id: 'q1',
					componentType: 'Input',
					page: '1',
					label: { value: 'Q1', type: 'TXT' },
					response: { name: 'VAR1' },
				},
				{
					id: 'q2',
					componentType: 'Input',
					page: '2',
					label: { value: 'Q2', type: 'TXT' },
					response: { name: 'VAR2' },
				},
				{
					id: 'q3',
					componentType: 'Input',
					page: '3',
					label: { value: 'Q3', type: 'TXT' },
					response: { name: 'VAR3' },
				},
			],
			variables: [
				{ variableType: 'COLLECTED', name: 'VAR1', values: { COLLECTED: null } },
				{ variableType: 'COLLECTED', name: 'VAR2', values: { COLLECTED: null } },
				{ variableType: 'COLLECTED', name: 'VAR3', values: { COLLECTED: null } },
			],
		} as unknown as LunaticSource;

		it('should return the current page when it has no response', () => {
			const { result } = renderHook(() =>
				useLunatic(sourceThreePages, undefined, {})
			);
			expect(result.current.getNextPageWithoutResponse()).toBe('1');
		});

		it('should skip pages that already have a response', () => {
			const { result } = renderHook(() =>
				useLunatic(sourceThreePages, undefined, {})
			);
			act(() => {
				result.current.handleChanges([{ name: 'VAR1', value: 'hello' }]);
			});
			expect(result.current.getNextPageWithoutResponse()).toBe('2');
		});

		it('should return undefined when every remaining page has a response', () => {
			const { result } = renderHook(() =>
				useLunatic(sourceThreePages, undefined, {})
			);
			act(() => {
				result.current.handleChanges([
					{ name: 'VAR1', value: 'hello' },
					{ name: 'VAR2', value: 'hello' },
					{ name: 'VAR3', value: 'hello' },
				]);
			});
			expect(result.current.getNextPageWithoutResponse()).toBeUndefined();
		});

		it('should not navigate, only return the page tag', () => {
			const { result } = renderHook(() =>
				useLunatic(sourceThreePages, undefined, {})
			);
			act(() => {
				result.current.handleChanges([{ name: 'VAR1', value: 'hello' }]);
			});
			result.current.getNextPageWithoutResponse();
			expect(result.current.pager.page).toBe(1);
		});
	});

	describe('loopVariables', () => {
		it('should return an empty list when being out of a loop', () => {
			const data = {
				COLLECTED: {
					PRENOM: { COLLECTED: ['John', 'Doe', 'Marc'] },
				},
			};

			const { result } = renderHook(() =>
				useLunatic(sourcePaginatedLoop, data, {})
			);

			act(() => {
				// go outside a loop
				result.current.goToPage({ page: 3 });
			});

			expect(result.current.loopVariables).toMatchObject([]);
		});

		it('should return an empty list when being on a non paginated loop', () => {
			const data = {
				COLLECTED: {
					PRENOM: { COLLECTED: ['John', 'Doe', 'Marc'] },
				},
			};

			const { result } = renderHook(() =>
				useLunatic(sourcePaginatedLoop, data, {})
			);

			// first page is a non paginated loop
			expect(result.current.loopVariables).toMatchObject([]);
		});

		it('should return the loop dependency variables when being in the loop', () => {
			const data = {
				COLLECTED: {
					PRENOM: { COLLECTED: ['John', 'Doe', 'Marc'] },
				},
			};

			const { result } = renderHook(() =>
				useLunatic(sourcePaginatedLoop, data, {})
			);

			act(() => {
				// go inside the non paginated loop, no matter the subPage or iteration
				result.current.goToPage({ page: 2, subPage: 0, iteration: 0 });
			});

			expect(result.current.loopVariables).toMatchObject(['PRENOM']);
		});
	});

	describe('roundaboutLoopVariables', () => {
		it('should return an empty list when being outside a roundabout', () => {
			const data = {
				COLLECTED: {
					NBHAB: { COLLECTED: 2 },
				},
			};

			const { result } = renderHook(() =>
				useLunatic(sourceRoundabout, data, {})
			);

			act(() => {
				result.current.goNextPage();
			});

			expect(result.current.roundaboutLoopVariables).toMatchObject([]);
		});

		it('should return an empty list when being on the roundabout page (not in its loop)', () => {
			const data = {
				COLLECTED: {
					NBHAB: { COLLECTED: 2 },
					PRENOMS: { COLLECTED: ['John', 'Doe', 'Marc'] },
					AGE: { COLLECTED: [18, 18, 18] },
				},
			};

			const { result } = renderHook(() =>
				useLunatic(sourceRoundabout, data, {})
			);

			act(() => {
				// go to roundabout page
				result.current.goToPage({ page: 3 });
			});

			expect(result.current.roundaboutLoopVariables).toMatchObject([]);
		});

		it('should return the roundabout loop dependencies variables when being in the roundabout loop', () => {
			const data = {
				COLLECTED: {
					NBHAB: { COLLECTED: 2 },
					PRENOMS: { COLLECTED: ['John', 'Doe', 'Marc'] },
					AGE: { COLLECTED: [18, 18, 18] },
				},
			};

			const { result } = renderHook(() =>
				useLunatic(sourceRoundabout, data, {})
			);

			act(() => {
				// go inside roundabout loop, no matter the subPage or iteration
				result.current.goToPage({ page: 3, subPage: 0, iteration: 0 });
			});

			expect(result.current.roundaboutLoopVariables).toMatchObject(['PRENOMS']);
		});
	});
});
