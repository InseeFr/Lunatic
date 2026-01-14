/*
Various utils function about what a component is or is not.
*/
import type { ReactNode } from 'react';
import type { LunaticComponentDefinition } from '../type';
import { type DeepTranslateExpression } from './fill-components/fill-component-expressions';

export type ComponentDefinition = LunaticComponentDefinition;
export type InterpretedComponent =
	DeepTranslateExpression<LunaticComponentDefinition>;
export type InterpretedLoopComponent = DeepTranslateExpression<
	ComponentDefinition & {
		componentType: 'Loop' | 'RosterForLoop';
	}
>;
export type InterpretedRoundaboutComponent = DeepTranslateExpression<
	ComponentDefinition & {
		componentType: 'Roundabout';
	}
>;
export type InterpretedQuestionComponent = DeepTranslateExpression<
	ComponentDefinition & {
		componentType: 'Question';
	}
>;
export type InterpretedPairwiseLinksComponent = DeepTranslateExpression<
	ComponentDefinition & {
		componentType: 'PairwiseLinks';
	}
>;

/** Whether the component has a response attribute. */
export function hasResponse(
	component: unknown
): component is { response: { name: string } } {
	return (
		!!component &&
		typeof component === 'object' &&
		'response' in component &&
		'name' in (component.response as object)
	);
}

/** Whether the component has a responses attribute. */
export function hasResponses(component: unknown): component is {
	responses?: Array<{
		label: ReactNode;
		description?: ReactNode;
		response: { name: string };
	}>;
} {
	return (
		!!component && typeof component === 'object' && 'responses' in component
	);
}

/** Whether the component has a body attribute. */
export function hasBody(component: unknown): component is {
	body: LunaticComponentDefinition<'Table'>['body'];
} {
	return (
		!!component &&
		typeof component === 'object' &&
		'body' in component &&
		Array.isArray(component.body)
	);
}

/** Whether the component has a componentType attribute. */
export function hasComponentType(
	component: unknown
): component is { componentType: string } {
	return (
		!!component &&
		typeof component === 'object' &&
		'componentType' in component &&
		typeof component.componentType === 'string'
	);
}

/** Whether the component is a Loop or a RosterForLoop. */
export function isLoopComponent(
	component: ComponentDefinition | InterpretedComponent
): component is InterpretedLoopComponent {
	return ['Loop', 'RosterForLoop'].includes(component.componentType);
}

/** Whether the component is a Roundabout. */
export function isRoundaboutComponent(
	component: ComponentDefinition | InterpretedComponent
): component is InterpretedRoundaboutComponent {
	return component.componentType === 'Roundabout';
}

/** Whether the component is a Question. */
export function isQuestionComponent(
	component: ComponentDefinition | InterpretedComponent
): component is InterpretedQuestionComponent {
	return component.componentType === 'Question';
}

/** Whether the component is a PairwiseLinks. */
export function isPairwiseLinksComponent(
	component: ComponentDefinition | InterpretedComponent
): component is InterpretedPairwiseLinksComponent {
	return component.componentType === 'PairwiseLinks';
}

/**
 * Get the pairwise component if it exists.
 *
 * There should only be one so we return the first one we find.
 */
export function getPairwiseComponent(
	components: ComponentDefinition[]
): InterpretedPairwiseLinksComponent | undefined {
	for (const component of components) {
		if (isPairwiseLinksComponent(component)) return component;
		if (isQuestionComponent(component)) {
			const childComponent = getPairwiseComponent(component.components);
			if (childComponent) return childComponent;
		}
	}

	return undefined;
}
