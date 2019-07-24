import { getLabelPositionClass } from 'utils/library';

describe('string utils', () => {
	describe('getLabelPositionClass', () => {
		it('should return default value', () => {
			expect(getLabelPositionClass()).toEqual('label-left');
			expect(getLabelPositionClass('')).toEqual('label-left');
		});
		it('should return "label-top"', () => {
			expect(getLabelPositionClass('TOP')).toEqual('label-top');
		});
		it('should return "label-bottom"', () => {
			expect(getLabelPositionClass('BOTTOM')).toEqual('label-bottom');
		});
		it('should return "label-right"', () => {
			expect(getLabelPositionClass('RIGHT')).toEqual('label-right');
		});
	});
});
