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
	componentClassName?: string;
} & Omit<LunaticComponentProps<'ComponentSet'>, 'id' | 'response'>;

function ComponentSetComponents({
	components,
	componentClassName,
	className,
	value,
	...props
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
							{...props}
							component={component}
							id={id}
							className={componentClassName}
							value={componentValue}
						/>
					</ComponentSetComponentContainer>
				);
			})}
		</>
	);
}

export default ComponentSetComponents;
