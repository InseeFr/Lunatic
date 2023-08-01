import * as lunatic from '../../../components';
import { fillComponentExpressions } from '../../../use-lunatic/commons';
import { LunaticBaseProps } from '../../type';
import { LunaticComponentDefinition } from '../../../use-lunatic/type';

type Props<T extends Record<string, unknown>> = {
	component: LunaticComponentDefinition;
	linksIterations?: number[];
} & Pick<LunaticBaseProps, 'iteration' | 'executeExpression'> &
	T;

function OrchestratedComponent<T extends Record<string, unknown>>({
	component,
	...props
}: Props<T>) {
	const { componentType } = component;

	const componentFilled = fillComponentExpressions(component, {
		executeExpression: props.executeExpression,
		pager: {
			iteration: props.iteration,
			linksIterations: props.linksIterations,
		},
	});

	const { conditionFilter } = componentFilled;
	const hasToBeDisplay = conditionFilter ?? true;

	if (componentType in lunatic && hasToBeDisplay) {
		const Component = (lunatic as any)[componentType]; // This is too dynamic, orchestration has no way to check props
		return <Component {...componentFilled} {...props} />;
	}
	return null;
}

export default OrchestratedComponent;
