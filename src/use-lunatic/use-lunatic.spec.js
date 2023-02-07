import source from '../stories/questionnaires/logement/source.json';
import useLunatic from './use-lunatic';
import { renderHook, act } from '@testing-library/react-hooks';
import sourceWithoutHierarchy from '../stories/overview/source.json';

const lunaticConfiguration = {
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

const advancedQestionnaireData = {
	COLLECTED: { CADR: { COLLECTED: '1' } },
};

describe('overview', function () {
	it('only first sequence visible', function () {
		const data = [];
		const { result } = renderHook(() =>
			useLunatic(source, data, {
				...lunaticConfiguration,
			})
		);
		const overview = result.current.overview;
		expect(overview).toHaveLength(11);
		expect(overview[0].reached).toEqual(true);
		expect(overview[0].visible).toEqual(true);
		expect(overview[1].reached).toEqual(false);
		expect(overview[1].visible).toEqual(true);
	});
	it('Empty overview when no hierarchy', function () {
		const data = [];
		const { result } = renderHook(() =>
			useLunatic(sourceWithoutHierarchy, data, {
				...lunaticConfiguration,
			})
		);
		expect(result.current.overview).toHaveLength(0);
	});
});

describe('overview with initial data', function () {
	it('Second Sequence visible', function () {
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
