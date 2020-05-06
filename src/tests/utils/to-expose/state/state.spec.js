import {
	getState,
	getCollectedState,
	getCollectedStateByValueType,
	getBindings,
} from 'utils/to-expose/state';
import questionnaire from './questionnaire';
import * as R from './results';

describe('state', () => {
	describe('getState', () => {
		it('should return empty object', () => {
			expect(getState([])).toEqual({
				COLLECTED: {},
				CALCULATED: {},
				EXTERNAL: {},
			});
		});
		it('should return object', () => {
			expect(getState(questionnaire)).toEqual(R.state);
		});
	});
	describe('getCollectedState', () => {
		it('should return empty object', () => {
			expect(getCollectedState([])).toEqual({});
		});
		it('should return object', () => {
			expect(getCollectedState(questionnaire)).toEqual(R.collectedState);
		});
	});
	describe('getCollectedStateByValueType', () => {
		it('should return empty object', () => {
			expect(getCollectedStateByValueType([])('')).toEqual({});
			expect(getCollectedStateByValueType(questionnaire)('')).toEqual({});
		});
		it('should return object', () => {
			expect(getCollectedStateByValueType(questionnaire)('COLLECTED')).toEqual(
				R.collectedStateCollected
			);
			expect(getCollectedStateByValueType(questionnaire)('FORCED')).toEqual(
				R.collectedStateForced
			);
			expect(
				getCollectedStateByValueType(questionnaire)('COLLECTED', true)
			).toEqual(R.collectedStateCollectedWithNull);
			expect(
				getCollectedStateByValueType(questionnaire)('FORCED', true)
			).toEqual(R.collectedStateForcedWithNull);
		});
	});
	describe('getBindings', () => {
		it('should return empty object', () => {
			expect(getBindings([])).toEqual({});
		});
		it('should return object', () => {
			expect(getBindings(questionnaire)).toEqual(R.bindingsResults);
		});
	});
});
