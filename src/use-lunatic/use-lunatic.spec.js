import source from '../stories/questionnaires/logement/source.json';
import useLunatic from './use-lunatic';
import { renderHook, act } from '@testing-library/react-hooks';

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
		const { result } = renderHook(() =>
			useLunatic(source, data, {
				...lunaticConfiguration,
			})
		);
		expect(result.current.breadcrumb).toHaveLength(11);
	});
});
