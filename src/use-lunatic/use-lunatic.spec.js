import source from '../stories/questionnaires/logement/source.json';
import useLunatic from './use-lunatic';
import { renderHook, act } from '@testing-library/react-hooks';
import sourceWithoutHierarchy from '../stories/overview/source.json';
import { describe, it, expect } from 'vitest';

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

const advancedQestionnaireData = {
	COLLECTED: { CADR: { COLLECTED: '1' } },
};

describe('overview', function () {
	it('should not calculate overview by default', function () {
		const data = [];
		const { result } = renderHook(() =>
			useLunatic(source, data, lunaticConfigurationWithoutOverview)
		);
		const overview = result.current.overview;
		expect(overview).toHaveLength(0);
	});
	it('should make the first sequence visible', function () {
		const data = [];
		const { result } = renderHook(() =>
			useLunatic(source, data, lunaticConfiguration)
		);
		const overview = result.current.overview;
		expect(overview).toHaveLength(11);
		expect(overview[0].reached).toEqual(true);
		expect(overview[0].visible).toEqual(true);
		expect(overview[1].reached).toEqual(false);
		expect(overview[1].visible).toEqual(true);
	});
	it('should update the breadcrumb on page change', function () {
		const data = [];
		const { result } = renderHook(() =>
			useLunatic(source, data, lunaticConfiguration)
		);
		// '8' page should not be visible
		expect(result.current.overview[0].children[0].visible).toBe(false);
		// Simulate a change of value in the form
		act(() => {
			const c = result.current.getComponents();
			c[0].handleChange({ name: 'CADR' }, '3');
			result.current.goNextPage();
		});
		// Page '8' should now be visible
		expect(result.current.overview[0].children[0].visible).toBe(true);
	});
	it('should be empty when no hierarchy', function () {
		const data = [];
		const { result } = renderHook(() =>
			useLunatic(sourceWithoutHierarchy, data, lunaticConfiguration)
		);
		expect(result.current.overview).toHaveLength(0);
	});

	describe('with initial data', function () {
		it('should make second sequence visible', function () {
			const { result } = renderHook(() =>
				useLunatic(source, advancedQestionnaireData, {
					...lunaticConfiguration,
					// hack on initialPage : useLunatic SHOULD find lastReachedPage from COLLECTED data
					initialPage: 16,
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
