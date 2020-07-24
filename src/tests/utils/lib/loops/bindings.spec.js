import {
	buildBindingsForDeepComponents,
	buildVectorialBindings,
} from 'utils/lib';

const bindings = { A: 'AAA', B: ['b', 'bb'] };

describe('loop bindings utils', () => {
	describe('buildBindingsForDeepComponents', () => {
		it('should return default value', () => {
			expect(buildBindingsForDeepComponents()()).toEqual({});
			expect(buildBindingsForDeepComponents(0)()).toEqual({});
			expect(buildBindingsForDeepComponents()({})).toEqual({});
		});
		it('should return bindings for loop', () => {
			expect(buildBindingsForDeepComponents(1)(bindings)).toEqual({
				A: 'AAA',
				B: 'bb',
			});
		});
	});
	describe('buildVectorialBindings', () => {
		it('should return default value', () => {
			expect(buildVectorialBindings()).toEqual({});
			expect(buildVectorialBindings({})).toEqual({});
		});
		it('should return vectorial bindings', () => {
			expect(buildVectorialBindings(bindings)).toEqual({
				A: 'AAA',
				B: { dataStructure: {}, dataPoints: { B: ['b', 'bb'] } },
			});
		});
	});
});
