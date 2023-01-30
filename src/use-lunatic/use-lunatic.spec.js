import source from '../stories/questionnaires/logement/source.json';
import useLunatic from './use-lunatic';
import { renderHook, act } from '@testing-library/react-hooks';
import sourceWithoutHierarchy from '../stories/breadcrumb/source.json';

const lunaticConfiguration = {
	management: false,
	activeControls: false,
	initialPage: '1',
	getStoreInfo: () => {},
	missing: false,
	shortcut: false,
	activeGoNextForMissing: false,
	showBreadcrumb: false,
	filterDescription: true,
};

const advancedQestionnaireData = {
	COLLECTED: { CADR: { COLLECTED: '1' } },
};

describe('breadcrumb', function () {
	it('only first sequence visible', function () {
		const data = [];
		const { result } = renderHook(() =>
			useLunatic(source, data, {
				...lunaticConfiguration,
			})
		);
		const breadcrumb = result.current.breadcrumb;
		expect(breadcrumb).toHaveLength(11);
		expect(breadcrumb[0].reached).toEqual(true);
		expect(breadcrumb[0].visible).toEqual(true);
		expect(breadcrumb[1].reached).toEqual(false);
		expect(breadcrumb[1].visible).toEqual(true);
	});
	it('Empty breadcrumb when no hierarchy', function () {
		const data = [];
		const { result } = renderHook(() =>
			useLunatic(sourceWithoutHierarchy, data, {
				...lunaticConfiguration,
			})
		);
		expect(result.current.breadcrumb).toHaveLength(0);
	});
});

describe('breadcrumb with initial data', function () {
	it('Second Sequence visible', function () {
		const { result } = renderHook(() =>
			useLunatic(source, advancedQestionnaireData, {
				...lunaticConfiguration,
				// hack on initialPage : useLunatic SHOULD find lastReachedPage from COLLECTED data
				initialPage: 16,
			})
		);
		const breadcrumb = result.current.breadcrumb;
		expect(breadcrumb).toHaveLength(11);
		expect(breadcrumb[0].reached).toEqual(true);
		expect(breadcrumb[0].visible).toEqual(true);
		expect(breadcrumb[1].reached).toEqual(true);
		expect(breadcrumb[1].visible).toEqual(true);
	});
});
