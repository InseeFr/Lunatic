import { renderHook, act } from '@testing-library/react-hooks';
import useLunatic from 'utils/to-expose/hooks/lunatic';
import source from '../init-questionnaire/questionnaire';

describe('useLunatic', () => {
	it('with pagination', () => {
		const { result } = renderHook(() =>
			useLunatic(source, {}, { features: ['VTL', 'MD'], pagination: true })
		);
		const {
			current: {
				components,
				pagination: { page, goNext, goPrevious },
			},
		} = result;
		expect(components.length).toEqual(2);
		expect(page).toEqual('1');

		act(() => {
			goNext();
		});

		expect(components.length).toEqual(2);
		expect(page).toEqual('1');

		act(() => {
			goPrevious();
		});

		expect(components.length).toEqual(2);
		expect(page).toEqual('1');
	});
	it('with custom props', () => {
		renderHook(() =>
			useLunatic(
				source,
				{},
				{
					management: true,
					savingType: 'EDITED',
					preferences: ['COLLECTED', 'EDITED'],
				}
			)
		);
	});
});
