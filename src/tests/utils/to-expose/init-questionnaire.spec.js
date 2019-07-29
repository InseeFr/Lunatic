import * as I from 'utils/to-expose/init-questionnaire';

describe('init-questionnaire', () => {
	describe('mergeQuestionnaireAndData', () => {
		it('should return empty object', () => {
			expect(I.mergeQuestionnaireAndData()()).toEqual({});
			expect(I.mergeQuestionnaireAndData({})({})).toEqual({});
		});
	});
});
