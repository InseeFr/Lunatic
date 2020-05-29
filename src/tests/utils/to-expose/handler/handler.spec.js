import * as H from 'utils/to-expose/handler';
import questionnaire from './questionnaire';
import * as R from './results';

describe('handler', () => {
	describe('updateQuestionnaire', () => {
		it('should return empty object', () => {
			expect(H.updateQuestionnaire('')({})([])()).toEqual({});
		});
		it('should return empty initial questionnaire', () => {
			expect(H.updateQuestionnaire('')(questionnaire)([])()).toEqual(
				questionnaire
			);
			expect(
				H.updateQuestionnaire('EDITED')(questionnaire)(['COLLECTED', 'EDITED'])(
					{
						input: 'My input',
					}
				)
			).toEqual(questionnaire);
			expect(
				H.updateQuestionnaire('EDITED')(questionnaire)([
					'COLLECTED',
					'FORCED',
					'EDITED',
				])({
					input: 'My input',
				})
			).toEqual(questionnaire);
			expect(
				H.updateQuestionnaire('FORCED')(questionnaire)(['COLLECTED', 'FORCED'])(
					{
						check2: true,
					}
				)
			).toEqual(questionnaire);
		});
		it('should return an updated questionnaire with response component', () => {
			expect(
				H.updateQuestionnaire('COLLECTED')(questionnaire)(['COLLECTED'])({
					input: 'My new input',
				})
			).toEqual(R.resInputCollected);

			expect(
				H.updateQuestionnaire('EDITED')(questionnaire)(['COLLECTED', 'EDITED'])(
					{
						input: 'My new input',
					}
				)
			).toEqual(R.resInputEdited);
		});
		it('should return an updated questionnaire with responses component', () => {
			expect(
				H.updateQuestionnaire('FORCED')(questionnaire)(['COLLECTED', 'FORCED'])(
					{
						check2: false,
					}
				)
			).toEqual(R.resResponses);
		});
		it('should return an updated questionnaire with matrix component', () => {
			expect(
				H.updateQuestionnaire('COLLECTED')(questionnaire)(['COLLECTED'])({
					table11: 'My new input',
				})
			).toEqual(R.resMatrix);
		});

		it('should return double updated questionnaire', () => {
			expect(
				H.updateQuestionnaire('COLLECTED')(questionnaire)(['COLLECTED'])({
					check1: false,
					table11: '2',
				})
			).toEqual(R.resDouble);
		});
		it('should return loop updated questionnaire', () => {
			expect(
				H.updateQuestionnaire('COLLECTED')(questionnaire)(['COLLECTED'])({
					Roster: ['ko'],
				})
			).toEqual(R.resLoop);
		});
	});
});
