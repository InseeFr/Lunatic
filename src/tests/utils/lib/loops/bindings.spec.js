import {
	buildBindingsForLoopComponents,
	buildVectorialBindings,
} from 'utils/lib';

const bindings = { A: 'AAA', B: ['b', 'bb'] };

describe('loop bindings utils', () => {
	describe('buildBindingsForLoopComponents', () => {
		it('should return default value', () => {
			expect(buildBindingsForLoopComponents()()).toEqual({});
			expect(buildBindingsForLoopComponents(0)()).toEqual({});
			expect(buildBindingsForLoopComponents()({})).toEqual({});
		});
		it('should return bindings for loop', () => {
			expect(buildBindingsForLoopComponents(1)(bindings)).toEqual({
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
