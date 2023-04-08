import * as lunatic from '../../../components';
import { fillComponentExpressions } from '../../../use-lunatic/commons';
import { LunaticBaseProps } from '../../type';
import { LunaticComponentDefinition } from '../../../use-lunatic/type';

type Props = {
	linksIterations?: [number, number];
	iteration: number;
	component: LunaticComponentDefinition;
	features?: string[];
} & Pick<
	LunaticBaseProps,
	| 'id'
	| 'iteration'
	| 'executeExpression'
	| 'handleChange'
	| 'missing'
	| 'shortcut'
	| 'management'
	| 'preferences'
	| 'value'
	| 'errors'
>;

function OrchestratedComponent({
	id,
	component,
	handleChange,
	features,
	missing,
	shortcut,
	management,
	preferences,
	value,
	iteration,
	linksIterations,
	executeExpression,
	errors,
}: Props) {
	const { componentType } = component;

	const componentFilled = fillComponentExpressions(component, {
		executeExpression,
		pager: { iteration, linksIterations },
	});

	const { conditionFilter } = componentFilled;
	const hasToBeDisplay = conditionFilter !== undefined ? conditionFilter : true;

	if (componentType in lunatic && hasToBeDisplay) {
		const Component = lunatic[componentType];
		return (
			<Component
				{...componentFilled}
				id={id}
				handleChange={handleChange}
				preferences={preferences}
				management={management}
				features={features}
				missing={missing}
				shortcut={shortcut}
				value={value}
				executeExpression={executeExpression}
				errors={errors}
			/>
		);
	}
	return null;
}

export default OrchestratedComponent;
