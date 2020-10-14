import { interpret, replaceNullBindings } from 'utils/to-expose/interpret';

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
		it('should return VTL interpreted label with default value', () => {
			expect(
				interpret(['VTL'])({ NAME: null }, true)('"Hello " || NAME')
			).toEqual('Hello NAME');
		});
	});
	describe('replaceNullBindings', () => {
		it('should return empty object', () => {
			expect(replaceNullBindings()).toEqual({});
		});
		it('should return empty object', () => {
			expect(replaceNullBindings({})).toEqual({});
		});
		it('should return the same object', () => {
			const bindings = { NAME: 'toto' };
			expect(replaceNullBindings(bindings)).toEqual(bindings);
		});
		it('should return replaced object', () => {
			const bindings = { NAME: 'toto', AGE: null };
			const res = { NAME: 'toto', AGE: 'AGE' };
			expect(replaceNullBindings(bindings)).toEqual(res);
		});
	});
});
