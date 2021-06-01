import { interpret } from 'utils/to-expose/interpret';

describe('interpret', () => {
	describe('interpretVTL', () => {
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
		it('should return VTL interpreted label with default value', () => {
			expect(interpret(['VTL'])({ NAME: null })('"Hello " || NAME')).toEqual(
				'Hello null'
			);
		});
	});
	describe('interpretVTLMD', () => {
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
			expect(
				interpret(['VTL', 'MD'])({ NAME: 'Mauro' })('"Hello " || NAME').props
					.source
			).toEqual('Hello Mauro');
		});
		it('should return VTL interpreted label with default value', () => {
			expect(
				interpret(['VTL', 'MD'])({ NAME: null })('"Hello " || NAME').props
					.source
			).toEqual('Hello null');
		});
	});
});
