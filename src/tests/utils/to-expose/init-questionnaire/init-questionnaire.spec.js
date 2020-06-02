import * as I from 'utils/to-expose/init-questionnaire';
import questionnaire from './questionnaire';
import data from './data';
import result from './result';

describe('init-questionnaire', () => {
	describe('mergeQuestionnaireAndData', () => {
		it('should return default', () => {
			expect(I.mergeQuestionnaireAndData()()).toEqual({});
			expect(I.mergeQuestionnaireAndData(questionnaire)()).toEqual(
				questionnaire
			);
			expect(I.mergeQuestionnaireAndData({})({})).toEqual({});
			expect(I.mergeQuestionnaireAndData({ components: [] })({})).toEqual({
				components: [],
			});
		});
		it('should return filled questionnaire', () => {
			expect(I.mergeQuestionnaireAndData(questionnaire)(data)).toEqual(result);
		});
	});
});
