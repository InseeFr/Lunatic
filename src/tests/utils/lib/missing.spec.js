import * as U from 'utils/lib';

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
});
