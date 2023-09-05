import { OrchestratedComponent } from '../../commons';
import ComponentSetComponentContainer from './component-set-component-container';
import { LunaticComponentProps } from '../../type';
import { LunaticComponentDefinition } from '../../../use-lunatic/type';
import { LabelType, ResponseType } from '../../../use-lunatic/type-source';

type ComponentWithResponses = LunaticComponentDefinition & {
	response: { name: string };
} & {
	responses: Array<{
		label: LabelType;
		response: ResponseType;
		id: string;
	}>;
};

/**
 * Extract the value associated with a component
 */
function getComponentValue(
	component: ComponentWithResponses,
	value: Record<string, unknown>
) {
	if (
		hasResponse(component) &&
		// Check if there is a response.name in the value object
		((component.response && component.response.name in value) ||
			// Check if the list responses.response.name is in the value object
			checkResponsesInValue(component, value))
	) {
		if (component.response) {
			// Returns value if there is one response
			return value[component.response.name] ?? '';
		} else {
			// If there are multiple responses,
			// returns an object containing the values corresponding to the responses
			return Object.fromEntries(
				Object.entries(value).filter(([key]) =>
					component.responses.map((response) =>
						response.response.name.includes(key)
					)
				)
			);
		}
	}
	return undefined;
}

/**
 * Narrow the type of the component
 */
function hasResponse(component: ComponentWithResponses) {
	return 'response' in component || 'responses' in component;
}

/**
 * When the component has multiple responses (eg. checkbox), we need to check this
 */
function checkResponsesInValue(
	component: ComponentWithResponses,
	value: Record<string, unknown>
) {
	const valueKeys = Object.keys(value);
	const responseNames = component.responses.map(
		(response) => response.response.name
	);

	for (const name of responseNames) {
		if (!valueKeys.includes(name)) {
			return false;
		}
	}
	return true;
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
				let componentValue = getComponentValue(
					component as ComponentWithResponses,
					value
				);
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
