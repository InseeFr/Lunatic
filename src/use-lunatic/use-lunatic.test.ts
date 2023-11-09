import { act, renderHook } from '@testing-library/react-hooks';
import { describe, expect, it, type Mock, vi } from 'vitest';
import useLunatic from './use-lunatic';

import sourceWithoutHierarchy from '../stories/overview/source.json';
import sourceLogement from '../stories/questionnaires/logement/source.json';
import sourceSimpsons from '../stories/questionnaires/simpsons/source.json';
import sourceComponentSet from '../stories/component-set/source.json';
import sourceCleaning from '../stories/behaviour/cleaning/source.json';
import sourceCleaningResizing from '../stories/behaviour/resizing/source-resizing-cleaning.json';
import type { LunaticData } from './type';
import { type FilledLunaticComponentProps } from './commons/fill-components/fill-components';

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
	const defaultParams = [
		sourceSimpsons as any,
		dataFromObject({}),
		{},
	] as const;

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
		expect(result.current.pager.page).toBe('35');
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
			initialPage: '1',
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
				useLunatic(sourceLogement as any, undefined, lunaticConfiguration)
			);
			const overview = result.current.overview;
			expect(overview).toHaveLength(11);
			expect(overview[0].reached).toEqual(true);
			expect(overview[0].visible).toEqual(true);
			expect(overview[1].reached).toEqual(false);
			expect(overview[1].visible).toEqual(true);
		});
		it('should update the breadcrumb on page change', function () {
			const { result } = renderHook(() =>
				useLunatic(sourceLogement as any, undefined, lunaticConfiguration)
			);
			// '8' page should not be visible
			expect(result.current.overview[0].children[0].visible).toBe(false);
			// Simulate a change of value in the form
			act(() => {
				const c = result.current.getComponents();
				c[0].handleChange({ name: 'CADR' }, '3', {});
				result.current.goNextPage();
			});
			// Page '8' should now be visible
			expect(result.current.overview[0].children[0].visible).toBe(true);
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
				expect(overview[0].visible).toEqual(true);
				expect(overview[1].reached).toEqual(true);
				expect(overview[1].visible).toEqual(true);
			});
		});
	});

	describe('cleaning', () => {
		it('should call handleChange on cleaned variable', () => {
			const spy = vi.fn();
			const { result } = renderHook(() =>
				useLunatic(sourceCleaning as any, undefined, {
					onChange: spy,
				})
			);
			result.current.onChange({ name: 'ORIGIN' }, 'FR');
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy.mock.calls[0][0]).toEqual({ name: 'ORIGIN' });
			expect(spy.mock.calls[0][1]).toEqual('FR');
			result.current.onChange({ name: 'ORIGIN' }, 'US');
			expect(spy).toHaveBeenCalledTimes(3);
			expect(spy.mock.calls[1][0]).toEqual({ name: 'CITY' });
			expect(spy.mock.calls[1][1]).toEqual(null);
			expect(spy.mock.calls[2][0]).toEqual({ name: 'ORIGIN' });
			expect(spy.mock.calls[2][1]).toEqual('US');
		});
	});

	describe('resizing', () => {
		const expectValueForResponse = (
			spy: Mock,
			responseName: string,
			expectedValue: unknown
		) => {
			expect(spy).toHaveBeenCalled();
			const lastChangeCall = spy.mock.calls.findLast(
				(args) => args[0].name === responseName
			);
			expect(
				lastChangeCall[1],
				'onChange should have been called with the right value'
			).toEqual(expectedValue);
		};

		it('should resize after cleaning', () => {
			const spy = vi.fn();
			const { result } = renderHook(() =>
				useLunatic(sourceCleaningResizing as any, undefined, {
					onChange: spy,
				})
			);
			result.current.onChange({ name: 'NB' }, 3);
			expectValueForResponse(spy, 'PRENOMS', [null, null, null]);
			result.current.onChange({ name: 'NB' }, 2);
			expectValueForResponse(spy, 'PRENOMS', [null, null]);
		});
	});

	describe('getComponents()', () => {
		describe('componentSet', () => {
			type ChildComponent = FilledLunaticComponentProps<'ComponentSet'>;
			const { result } = renderHook(() =>
				useLunatic(sourceComponentSet as any, undefined, {})
			);
			const getComponents = () =>
				result.current.getComponents() as ChildComponent[];
			it('should fill child components', () => {
				let components = getComponents();
				expect(components).toHaveLength(1);
				expect(components[0].components ?? []).toHaveLength(2);
			});
			it('should use conditionFilter on nested components', () => {
				act(() => result.current.onChange({ name: 'PRENOM' }, 'Jane'));
				expect(getComponents()[0].components).toHaveLength(3);
			});
		});
	});
});
