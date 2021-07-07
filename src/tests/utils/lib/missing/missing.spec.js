import * as U from 'utils/lib';
import * as M from './mock';

describe('buildLoopMissingResponse', () => {
	it('should return default value', () => {
		expect(U.buildLoopMissingResponse()({})).toBeUndefined();
		expect(U.buildLoopMissingResponse(0)()).toBeUndefined();
	});
	it('should return new missingResponse', () => {
		expect(
			U.buildLoopMissingResponse([1])({
				name: 'var',
				values: { COLLECTED: [null, 1], EDITED: [null, 2] },
			})
		).toEqual({
			name: 'var',
			values: { COLLECTED: 1, EDITED: 2 },
		});
		expect(
			U.buildLoopMissingResponse([0])({
				name: 'var',
				values: { COLLECTED: [null, 1], EDITED: [null, 2] },
			})
		).toEqual({
			name: 'var',
			values: { COLLECTED: null, EDITED: null },
		});
	});
	it('should return getToClean for response', () => {
		expect(U.getToClean('COLLECTED')(M.qRespTrue)).toEqual({
			response: null,
		});
		expect(U.getToClean('COLLECTED')(M.qRespFalse)).toEqual({});
	});
	it('should return getToClean for responses', () => {
		expect(U.getToClean('COLLECTED')(M.qRespsTrue)).toEqual({
			response1: null,
			response2: null,
		});
		expect(U.getToClean('COLLECTED')(M.qRespsFalse)).toEqual({});
	});
	it('should return getToClean for cells', () => {
		expect(U.getToClean('COLLECTED')(M.qCellsTrue)).toEqual({
			response2: null,
		});
		expect(U.getToClean('COLLECTED')(M.qCellsFalse)).toEqual({});
	});
	it('should return getToClean for components', () => {
		expect(U.getToClean('COLLECTED')(M.qComponentsTrue)).toEqual({
			response2: [
				[null, null],
				[null, null],
			],
			response3: null,
		});
		expect(U.getToClean('COLLECTED')(M.qComponentsFalse)).toEqual({});
	});
	it('should return hasToCleanMissing for response', () => {
		expect(U.hasToCleanMissing('COLLECTED')(M.qRespTrue)).toBeTruthy();
		expect(U.hasToCleanMissing('COLLECTED')(M.qRespFalse)).toBeFalsy();
	});
	it('should return hasToCleanMissing for responses', () => {
		expect(U.hasToCleanMissing('COLLECTED')(M.qRespsTrue)).toBeTruthy();
		expect(U.hasToCleanMissing('COLLECTED')(M.qRespsFalse)).toBeFalsy();
	});
	it('should return hasToCleanMissing for cells', () => {
		expect(U.hasToCleanMissing('COLLECTED')(M.qCellsTrue)).toBeTruthy();
		expect(U.hasToCleanMissing('COLLECTED')(M.qCellsFalse)).toBeFalsy();
	});
	it('should return hasToCleanMissing for components', () => {
		expect(U.hasToCleanMissing('COLLECTED')(M.qComponentsTrue)).toBeTruthy();
		expect(U.hasToCleanMissing('COLLECTED')(M.qComponentsFalse)).toBeFalsy();
	});
});
