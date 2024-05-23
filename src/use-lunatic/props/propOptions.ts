import type { LunaticComponentDefinition } from '../type';
import type { ReactNode } from 'react';
import { fillComponent } from '../commons/fill-components/fill-components';
import type { DeepTranslateExpression } from '../commons/fill-components/fill-component-expressions';
import { isNumber } from '../../utils/number';

export type InterpretedOption = {
	label: ReactNode;
	value: string;
	checked: boolean;
	detailLabel?: ReactNode;
	description?: ReactNode;
	detailValue?: unknown;
	onDetailChange?: (value: string) => void;
	onCheck: () => void;
};

/**
 * Compute options for checkboxes / radios
 */
export function getOptionsProp(
	definition: DeepTranslateExpression<LunaticComponentDefinition>,
	state: Parameters<typeof fillComponent>[1],
	value: unknown
) {
	if (!('options' in definition)) {
		return [];
	}
	return definition.options.map((option) => ({
		label: option.label,
		description: option.description,
		value: option.value,
		checked: value === option.value,
		onCheck: () => {
			state.handleChanges([
				{ name: definition.response.name, value: option.value },
			]);
		},
		detailValue:
			'detail' in option && option.detail
				? state.variables.get(
						option.detail.response.name,
						isNumber(state.pager.iteration)
							? [state.pager.iteration]
							: undefined
					)
				: null,
		onDetailChange:
			'detail' in option && option.detail
				? (value: string) => {
						state.handleChanges([
							{ name: option.detail!.response.name, value },
						]);
					}
				: null,
	}));
}
