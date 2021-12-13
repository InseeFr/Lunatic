import * as C from '../../constants';
import { isDev } from '../lib';

export const getState = (questionnaire) => {
	const { variables } = questionnaire;
	return {
		[C.CALCULATED]: getCalculatedFromVariables(variables),
		[C.COLLECTED]: getCollectedState(questionnaire),
		[C.EXTERNAL]: getExternalFromVariables(variables),
	};
};

export const getCollectedState = (questionnaire) => {
	const { variables } = questionnaire;
	return (
		(variables &&
			variables[C.COLLECTED] &&
			Object.entries(variables[C.COLLECTED]).reduce(
				(acc, [name, { values }]) => ({ ...acc, [name]: values }),
				{}
			)) ||
		{}
	);
};

const getCalculatedFromVariables = (variables) =>
	variables && variables[C.CALCULATED]
		? Object.entries(variables[C.CALCULATED]).reduce(
				(_, [name, { value }]) => ({ ..._, [name]: value }),
				{}
		  )
		: {};

const getExternalFromVariables = (variables) =>
	(variables && variables[C.EXTERNAL]) || {};

export const getCollectedStateByValueType =
	(questionnaire) => (valueType, displayNull) =>
		['PREVIOUS', 'COLLECTED', 'FORCED', 'EDITED', 'INPUTED'].includes(valueType)
			? Object.entries(getCollectedState(questionnaire)).reduce((_, v) => {
					if (displayNull || v[1][valueType] !== null)
						return {
							..._,
							[v[0]]: v[1][valueType],
						};
					return _;
			  }, {})
			: {};

export const getBindings = (questionnaire) => {
	if (isDev) {
		console.log('Get bindings');
		var start = new Date().getTime();
	}
	const { variables } = questionnaire;
	const bindings = {
		...getCollectedStateByValueType(questionnaire)('COLLECTED', true),
		...getCalculatedFromVariables(variables),
		...getExternalFromVariables(variables),
	};
	if (isDev)
		console.log(`End get bindings: ${new Date().getTime() - start} ms`);
	return bindings;
};
