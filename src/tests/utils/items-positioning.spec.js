import { getItemsPositioningClass } from 'utils/items-positioning';

describe('string utils', () => {
	describe('getItemsPositioningClass', () => {
		it('should return default value', () => {
			expect(getItemsPositioningClass()).toEqual('');
			expect(getItemsPositioningClass('')).toEqual('');
			expect(getItemsPositioningClass('DEFAULT')).toEqual('');
			expect(getItemsPositioningClass('VERTICAL')).toEqual('');
		});
		it('should return "horizontal-items"', () => {
			expect(getItemsPositioningClass('HORIZONTAL')).toEqual(
				'horizontal-items'
			);
		});
	});
});
