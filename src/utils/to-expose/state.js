import * as C from '../../constants';

export const getState = (questionnaire) => {
	const { variables } = questionnaire;
	return {
		[C.CALCULATED]: getCalculatedFromVariables(variables),
		[C.COLLECTED]: getCollectedState(questionnaire),
		[C.EXTERNAL]: getExternalFromVariables(variables),
	};
};

export const getCollectedState = (questionnaire) => {
	const collectedVars =
		(questionnaire &&
			questionnaire.variables &&
			questionnaire.variables[C.COLLECTED]) ||
		{};
	return Object.entries(collectedVars).reduce(
		(acc, [name, { valueState }]) => ({
			...acc,
			[name]: valueStateAsObj(valueState),
		}),
		{}
	);
};

const valueStateAsObj = (vs) =>
	vs.reduce(
		(acc, { valueType, value }) => ({ ...acc, [valueType]: value }),
		{}
	);

const getCalculatedFromVariables = (variables) =>
	variables && variables[C.CALCULATED]
		? Object.entries(variables[C.CALCULATED]).reduce(
				(_, [name, { value }]) => ({ ..._, [name]: value }),
				{}
		  )
		: {};

const getExternalFromVariables = (variables) =>
	(variables && variables[C.EXTERNAL]) || {};

export const getCollectedStateByValueType = (questionnaire) => (
	valueType,
	displayNull
) =>
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
	const { variables } = questionnaire;
	return {
		...getCollectedStateByValueType(questionnaire)('COLLECTED', true),
		...getCalculatedFromVariables(variables),
		...getExternalFromVariables(variables),
	};
};
