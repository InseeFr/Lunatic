import { buildTooltip } from 'utils/lib';

describe('build tooltip content', () => {
	describe('buildTooltip', () => {
		it('should return default value', () => {
			expect(buildTooltip()).toEqual({});
			expect(buildTooltip({ values: {} })).toEqual({});
			expect(
				buildTooltip({
					values: { COLLECTED: 'Collected' },
				})
			).toEqual({});
		});
		it('should return COLLECTED', () => {
			expect(
				buildTooltip({
					values: { COLLECTED: 'Collected', FORCED: 'Forced' },
				})
			).toEqual({
				content: [
					{
						key: 'Brute',
						value: 'Collected',
					},
				],
				imgName: 'forcedImg',
			});
			expect(
				buildTooltip({
					values: { COLLECTED: null, FORCED: 'Forced' },
				})
			).toEqual({
				content: [
					{
						key: 'Brute',
						value: ' - ',
					},
				],
				imgName: 'forcedImg',
			});
		});
		it('should return COLLECTED FORCED', () => {
			expect(
				buildTooltip({
					values: {
						COLLECTED: 'Collected',
						FORCED: 'Forced',
						EDITED: 'Edited',
					},
				})
			).toEqual({
				content: [
					{
						key: 'Brute',
						value: 'Collected',
					},
					{
						key: 'Correction automatique',
						value: 'Forced',
					},
				],
				imgName: 'editedImg',
			});
			expect(
				buildTooltip({
					values: { COLLECTED: null, FORCED: null, EDITED: 'Edited' },
				})
			).toEqual({
				content: [
					{
						key: 'Brute',
						value: ' - ',
					},
				],
				imgName: 'editedImg',
			});
			expect(
				buildTooltip({
					values: { COLLECTED: 'Collected', FORCED: null, EDITED: 'Edited' },
				})
			).toEqual({
				content: [
					{
						key: 'Brute',
						value: 'Collected',
					},
				],
				imgName: 'editedImg',
			});
			expect(
				buildTooltip({
					values: { COLLECTED: null, FORCED: 'Forced', EDITED: 'Edited' },
				})
			).toEqual({
				content: [
					{
						key: 'Brute',
						value: ' - ',
					},
					{
						key: 'Correction automatique',
						value: 'Forced',
					},
				],
				imgName: 'editedImg',
			});
		});
	});
});
