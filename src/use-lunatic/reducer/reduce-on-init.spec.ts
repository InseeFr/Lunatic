import {describe, expect, it} from 'vitest';
import RadioSource from '../../stories/radio/source.json'
import {generateState} from "../../../tests/utils/lunatic";


describe('reduce-on-init', () => {
	describe('init variables', () => {
		it('should init false variable correctly', () => {
			const state = generateState(RadioSource as any, {Q2: false})
			expect(state.variables).toHaveProperty('Q2')
			expect(state.variables.Q2.value).toEqual(false)
		})
	})
})
