// updateQuestionnaire is useless since 2.0 optimization efforts
// export { updateQuestionnaire } from './handler';
export { mergeQuestionnaireAndData } from './init-questionnaire';
export {
	getState,
	getCollectedState,
	getCollectedStateByValueType,
	getBindings,
} from './state';
export { interpret, interpretWithEmptyDefault } from './interpret';
export { default as useLunatic } from './hook';
