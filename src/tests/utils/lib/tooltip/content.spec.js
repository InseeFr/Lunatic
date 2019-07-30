import { buildTooltip } from 'utils/lib';

describe('build tooltip content', () => {
	describe('buildTooltip', () => {
		it('should return default value', () => {
			expect(buildTooltip()).toEqual({});
			expect(buildTooltip({ valueState: [] })).toEqual({});
			expect(
				buildTooltip({
					valueState: [{ valueType: 'COLLECTED', value: 'Collected' }],
				})
			).toEqual({});
		});
		it('should return COLLECTED', () => {
			expect(
				buildTooltip({
					valueState: [
						{ valueType: 'COLLECTED', value: 'Collected' },
						{ valueType: 'FORCED', value: 'Forced' },
					],
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
					valueState: [
						{ valueType: 'COLLECTED', value: null },
						{ valueType: 'FORCED', value: 'Forced' },
					],
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
					valueState: [
						{ valueType: 'COLLECTED', value: 'Collected' },
						{ valueType: 'FORCED', value: 'Forced' },
						{ valueType: 'EDITED', value: 'Edited' },
					],
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
					valueState: [
						{ valueType: 'COLLECTED', value: null },
						{ valueType: 'FORCED', value: null },
						{ valueType: 'EDITED', value: 'Edited' },
					],
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
					valueState: [
						{ valueType: 'COLLECTED', value: 'Collected' },
						{ valueType: 'FORCED', value: null },
						{ valueType: 'EDITED', value: 'Edited' },
					],
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
					valueState: [
						{ valueType: 'COLLECTED', value: null },
						{ valueType: 'FORCED', value: 'Forced' },
						{ valueType: 'EDITED', value: 'Edited' },
					],
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
