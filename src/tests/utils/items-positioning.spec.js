import { getItemsPositioningClass } from 'utils/lib';

describe('string utils', () => {
	describe('getItemsPositioningClass', () => {
		it('should return default value', () => {
			expect(getItemsPositioningClass()).toEqual('');
			expect(getItemsPositioningClass('')).toEqual('');
			expect(getItemsPositioningClass('DEFAULT')).toEqual('');
			expect(getItemsPositioningClass('VERTICAL')).toEqual('');
		});
		it('should return "horizontal-options"', () => {
			expect(getItemsPositioningClass('HORIZONTAL')).toEqual(
				'horizontal-options'
			);
		});
	});
});
