import { interpret } from 'utils/to-expose/interpret';

describe('interpret', () => {
	describe('interpret', () => {
		it('should return empty label', () => {
			expect(interpret()()()).toEqual('');
		});
		it('should return empty label', () => {
			expect(interpret({})()()).toEqual('');
		});
		it('should return the same label', () => {
			expect(interpret([])({})('label')).toEqual('label');
		});
		it('should return VTL interpreted label', () => {
			expect(interpret(['VTL'])({ NAME: 'Mauro' })('"Hello " || NAME')).toEqual(
				'Hello Mauro'
			);
		});
	});
});
