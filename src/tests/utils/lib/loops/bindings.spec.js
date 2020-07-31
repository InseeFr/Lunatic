import {
	buildBindingsForDeeperComponents,
	buildVectorialBindings,
	displayLoop,
	displayLoopQuestion,
} from 'utils/lib';

const bindings = { A: 'AAA', B: ['b', 'bb'] };

describe('loop bindings utils', () => {
	describe('buildBindingsForDeeperComponents', () => {
		it('should return default value', () => {
			expect(buildBindingsForDeeperComponents()()).toEqual({});
			expect(buildBindingsForDeeperComponents(0)()).toEqual({});
			expect(buildBindingsForDeeperComponents()({})).toEqual({});
		});
		it('should return bindings for loop', () => {
			expect(buildBindingsForDeeperComponents(1)(bindings)).toEqual({
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
	describe('displayLoop', () => {
		it('should return default value', () => {
			expect(displayLoop()()).toBeFalsy();
			expect(displayLoop([])({})).toBeFalsy();
		});
		it('should not return display loop', () => {
			expect(displayLoop(['A'])({ A: [null] })).toBeFalsy();
		});
		it('should return display loop', () => {
			expect(displayLoop(['A'])({ A: ['a'] })).toBeTruthy();
		});
	});
	describe('displayLoopQuestion', () => {
		it('should return default value', () => {
			expect(displayLoopQuestion()()).toBeFalsy();
			expect(displayLoopQuestion([])({})).toBeFalsy();
		});
		it('should not return display loop', () => {
			expect(displayLoopQuestion(['A'])({ A: [[null]] })).toBeFalsy();
		});
		it('should return display loop', () => {
			expect(displayLoopQuestion(['A'])({ A: 'a' })).toBeTruthy();
		});
	});
});
