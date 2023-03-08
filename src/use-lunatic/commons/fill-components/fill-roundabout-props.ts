import { LunaticComponentDefinition, LunaticState } from '../../type';
import { DeepTranslateExpression } from './fill-component-expressions';
import { objectMap } from '../../../utils/object';
import { resizeArray } from '../../../utils/array';

export function fillRoundaboutProps(
	component: DeepTranslateExpression<LunaticComponentDefinition>,
	state: LunaticState
) {
	if (component.componentType !== 'Roundabout') {
		return component;
	}

	const { executeExpression } = state;
	const { iterations, expressions } = component;

	if (typeof iterations !== 'number') {
		return component;
	}

	// Compile expression required for the roundabout (state for each iteration, label...)
	const compiledExpressions = objectMap(expressions, (name, expression) => [
		name,
		resizeArray([], iterations, '').map((_, k) =>
			executeExpression(expression, { iteration: [k] })
		),
	]);

	// Inject a helper method to go to a specific iteration within the roundabout
	const goToIteration = (iteration: number) => {
		state.goToPage({
			page: [...state.pager.page, 1],
			iteration: [...state.pager.iteration, iteration],
		});
	};

	return {
		...component,
		expressions: compiledExpressions,
		goToIteration,
	};
}
