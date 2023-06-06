import React from 'react';
import { OrchestratedComponent } from '../../commons';
import ComponentSetComponentContainer from './component-set-component-container';
import { LunaticComponentProps } from '../../type';
import { LunaticComponentDefinition } from '../../../use-lunatic/type';

/**
 * Extract the value associated with a component
 */
function getComponentValue(
	component: LunaticComponentDefinition,
	value: Record<string, unknown>
) {
	if (hasResponse(component) && component.response.name in value) {
		return value[component.response.name] ?? '';
	}
	return undefined;
}

/**
 * Narrow the type of the component
 */
function hasResponse(
	component: LunaticComponentDefinition
): component is LunaticComponentDefinition & { response: { name: string } } {
	return 'response' in component;
}

type Props = {
	className?: string;
} & Pick<
	LunaticComponentProps<'ComponentSet'>,
	| 'components'
	| 'value'
	| 'features'
	| 'missing'
	| 'shortcut'
	| 'management'
	| 'preferences'
	| 'executeExpression'
	| 'errors'
	| 'className'
	| 'handleChange'
	| 'iteration'
>;

function ComponentSetComponents({
	components,
	value,
	features,
	missing,
	shortcut,
	management,
	preferences,
	executeExpression,
	errors,
	className,
	handleChange,
	iteration,
}: Props) {
	if (!Array.isArray(components)) {
		return null;
	}
	return (
		<>
			{components.map((component) => {
				const { id } = component;
				let componentValue = getComponentValue(component, value);
				return (
					<ComponentSetComponentContainer className={className} key={id}>
						<OrchestratedComponent
							component={component}
							features={features}
							missing={missing}
							shortcut={shortcut}
							management={management}
							value={componentValue}
							iteration={iteration}
							id={id}
							preferences={preferences}
							executeExpression={executeExpression}
							errors={errors}
							handleChange={handleChange}
						/>
					</ComponentSetComponentContainer>
				);
			})}
		</>
	);
}

export default ComponentSetComponents;
