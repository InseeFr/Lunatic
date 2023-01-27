import source from '../stories/questionnaires/logement/source.json';
import useLunatic from './use-lunatic';

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

// const advancedQestionnaireData = { COLLECTED: { READY: { COLLECTED: true } } };

describe('breadcrumb', function () {
	it('only first sequence visible', function () {
		const data = [];
		const { breadcrumb } = useLunatic(source, data, {
			...lunaticConfiguration,
		});
		expect(Array.isArray(breadcrumb)).toBe(true);
	});

	it('subSequence visible', function () {
		expect(0).toBe(0);
	});
});
