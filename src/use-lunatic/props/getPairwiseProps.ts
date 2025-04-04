import type { DeepTranslateExpression } from '../commons/fill-components/fill-component-expressions';
import type { LunaticComponentDefinition } from '../type';
import type { ItemOf } from '../../type.utils';
import type { fillComponent } from '../commons/fill-components/fill-components';
import { findComponent } from '../commons/component';
import type { VTLExpression } from '../../type.source';

type State = Parameters<typeof fillComponent>[1];

/**
 * Add specific props for the Recap Component
 * - fields expression is transformed
 */
export function getRecapProps(
	component: DeepTranslateExpression<LunaticComponentDefinition<'Recap'>>,
	state: State
) {
	const getValue = (field: ItemOf<typeof component.fields>) => {
		if (field.pairwise) {
			return {
				label: field.label,
				value: extractPairwiseFrom(field.pairwise, field.value, state),
			};
		}
		return {
			label: field.label,
			value: state.executeExpression(field.value, {
				iteration: state.pager.iteration,
			}),
		};
	};

	return {
		fields: component.fields.map(getValue),
	};
}

/**
 * Compute the pairwise data
 *
 * To handle this logic we first need to find the corresponding dropdown (to get the labels)
 * Then, get the value (array of number) and compute labels
 */
function extractPairwiseFrom(
	name: string,
	expression: VTLExpression,
	state: State
): string[] | string {
	// Look for the pairwise component linked to the variable
	const dropdownComponent = findComponent(
		Object.values(state.pages).flatMap((p) => p.components),
		(c) => {
			return 'response' in c && c.response.name === name;
		}
	);

	if (!dropdownComponent || dropdownComponent.componentType !== 'Dropdown') {
		return 'Cannot resolve pairwise data';
	}

	const values = state.executeExpression(
		{ type: 'VTL', value: name },
		{ iteration: state.pager.iteration }
	);

	if (!Array.isArray(values)) {
		return 'Cannot resolve pairwise data';
	}

	return values
		.map((v, k) => {
			const option = dropdownComponent.options.find((o) => o.value === v);
			if (!option) {
				return null;
			}

			return state.executeExpression<string>(
				{
					...expression,
					value: expression.value.replaceAll(
						'LINKS',
						`"${state.executeExpression(option.label, { iteration: state.pager.iteration })}"`
					),
				},
				{ iteration: k }
			);
		})
		.filter((v) => v !== null);
}
