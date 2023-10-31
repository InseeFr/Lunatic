import { act, renderHook } from '@testing-library/react-hooks';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import useLunatic from './use-lunatic';

import sourceWithoutHierarchy from '../stories/overview/source.json';
import sourceLogement from '../stories/questionnaires/logement/source.json';
import sourceSimpsons from '../stories/questionnaires2023/simpsons/source.json';
import sourceComponentSet from '../stories/component-set/source.json';
import sourceCleaning from '../stories/behaviour/cleaning/source.json';
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
		expect(result.current.pager.maxPage).toBe('41');
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

	describe('getData()', () => {
		let hookRef: { current: ReturnType<typeof useLunatic> };
		beforeEach(() => {
			const { result } = renderHook(() =>
				useLunatic(sourceSimpsons as any, undefined, {})
			);
			act(() => {
				result.current.onChange({ name: 'COMMENT' }, 'Mon commentaire');
				result.current.onChange({ name: 'READY' }, true);
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
			expect(Object.keys(data.COLLECTED)).toHaveLength(109);
			expect(Object.keys(data.CALCULATED)).toHaveLength(0);
		});
		it('should return calculated values', () => {
			const data = hookRef.current.getData(true);
			expect(Object.keys(data.COLLECTED)).toHaveLength(109);
			expect(Object.keys(data.CALCULATED)).toHaveLength(33);
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
			expect(Object.keys(data.COLLECTED)).toHaveLength(1);
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
				hookRef.current.onChange({ name: 'COMMENT' }, 'Mon commentaire');
				hookRef.current.onChange({ name: 'READY' }, true);
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
				hookRef.current.onChange({ name: 'COMMENT' }, 'Mon commentaire');
				hookRef.current.onChange({ name: 'READY' }, true);
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
				hookRef.current.onChange({ name: 'COMMENT' }, 'Mon commentaire');
				hookRef.current.onChange({ name: 'READY' }, true);
			});
			hookRef.current.resetChangedData();
			expect(hookRef.current.getChangedData().COLLECTED).toEqual({});
			act(() => {
				hookRef.current.onChange({ name: 'READY' }, false);
			});
			expect(hookRef.current.getChangedData().COLLECTED).toMatchObject({
				READY: {
					COLLECTED: false,
				},
			});
		});
	});
});
