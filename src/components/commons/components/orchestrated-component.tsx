import * as lunatic from '../../../components';
import { fillComponentExpressions } from '../../../use-lunatic/commons';
import { LunaticBaseProps } from '../../type';
import { LunaticComponentDefinition } from '../../../use-lunatic/type';
import { getSuggesterStatusType } from '../../component-set/lunatic-component-set';

type Props = {
	linksIterations?: [number, number];
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
	| 'className'
	| 'disabled'
> &
	getSuggesterStatusType;

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
	disabled,
	errors,
	getSuggesterStatus,
}: Props) {
	const { componentType } = component;

	const componentFilled = fillComponentExpressions(component, {
		executeExpression,
		pager: { iteration, linksIterations },
	});

	const { conditionFilter } = componentFilled;
	const hasToBeDisplay = conditionFilter ?? true;

	if (componentType in lunatic && hasToBeDisplay) {
		const Component = (lunatic as any)[componentType]; // This is too dynamic, orchestration has no way to check props
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
				iteration={iteration}
				disabled={disabled}
				getSuggesterStatus={getSuggesterStatus}
			/>
		);
	}
	return null;
}

export default OrchestratedComponent;
