import { LunaticComponentDefinition, LunaticState } from '../../type';
import { DeepTranslateExpression } from './fill-component-expressions';

function resolveRoundabout(
	component: DeepTranslateExpression<LunaticComponentDefinition>,
	state: LunaticState
) {
	const { executeExpression } = state;
	const { componentType } = component;

	if (componentType === 'Roundabout') {
		const { iterations, expressions } = component;
		const compiled = Object.entries(expressions).reduce(function (
			result,
			[name, expression]
		) {
			const values = new Array(iterations).fill(null).map((_, iteration) => {
				return executeExpression(expression, { iteration: [iteration] });
			});
			return { ...result, [name]: values };
		},
		{});
		return { ...component, expressions: compiled };
	}

	return component;
}

function fillSpecificExpressions(
	component: DeepTranslateExpression<LunaticComponentDefinition>,
	state: LunaticState
) {
	return resolveRoundabout(component, state);
}

export default fillSpecificExpressions;
