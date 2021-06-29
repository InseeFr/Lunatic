import * as U from 'utils/lib';

const bindings = { A: 'AAA', B: ['b', 'bb'] };

describe('loop bindings utils', () => {
	describe('buildBindingsForDeeperComponents', () => {
		it('should return default value', () => {
			expect(U.buildBindingsForDeeperComponents()()).toEqual({});
			expect(U.buildBindingsForDeeperComponents(0)()).toEqual({});
			expect(U.buildBindingsForDeeperComponents()({})).toEqual({});
		});
		it('should return bindings for loop', () => {
			expect(U.buildBindingsForDeeperComponents(1)(bindings)).toEqual({
				A: 'AAA',
				B: 'bb',
			});
		});
	});
	describe('buildLoopBindings', () => {
		it('should return default value', () => {
			expect(U.buildLoopBindings(0)()).toEqual({});
			expect(U.buildLoopBindings(0)({})).toEqual({});
		});
		it('should return bindings for loop', () => {
			expect(
				U.buildLoopBindings(1)([
					['a', 'A'],
					['b', ['B0', 'B1']],
				])
			).toEqual({
				a: 'A',
				b: 'B1',
			});
		});
	});
	describe('buildVectorialBindings', () => {
		it('should return default value', () => {
			expect(U.buildVectorialBindings()).toEqual({});
			expect(U.buildVectorialBindings({})).toEqual({});
		});
		it('should return vectorial bindings', () => {
			expect(U.buildVectorialBindings(bindings)).toEqual({
				A: 'AAA',
				B: { dataStructure: {}, dataPoints: { B: ['b', 'bb'] } },
			});
		});
	});
	describe('displayLoop', () => {
		it('should return default value', () => {
			expect(U.displayLoop()()).toBeFalsy();
			expect(U.displayLoop([])({})).toBeFalsy();
		});
		it('should not return display loop', () => {
			expect(U.displayLoop(['A'])({ A: [null] })).toBeFalsy();
		});
		it('should return display loop', () => {
			expect(U.displayLoop(['A'])({ A: ['a'] })).toBeTruthy();
		});
	});
	describe('displayLoopQuestion', () => {
		it('should return default value', () => {
			expect(U.displayLoopQuestion()()).toBeFalsy();
			expect(U.displayLoopQuestion([])({})).toBeFalsy();
		});
		it('should not return display loop', () => {
			expect(U.displayLoopQuestion(['A'])({ A: [[null]] })).toBeFalsy();
		});
		it('should return display loop', () => {
			expect(U.displayLoopQuestion(['A'])({ A: 'a' })).toBeTruthy();
		});
	});
});
