import type {
	LunaticChangesHandler,
	LunaticComponentDefinition,
	LunaticState,
} from '../type';
import type { ReactNode } from 'react';
import type { DeepTranslateExpression } from '../commons/fill-components/fill-component-expressions';
import { isNumber } from '../../utils/number';
import type { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';

export type InterpretedOption = {
	label: ReactNode;
	value?: string;
	checked?: boolean;
	detailLabel?: ReactNode;
	description?: ReactNode;
	detailValue?: string | null;
	onDetailChange?: (value: string) => void;
	onCheck?: () => void;
};

/**
 * Compute options for checkboxes / radios
 */
export function getOptionsProp(
	definition: DeepTranslateExpression<LunaticComponentDefinition>,
	variables: LunaticVariablesStore,
	handleChanges: LunaticChangesHandler,
	pagerIteration: LunaticState['pager']['iteration'],
	value: unknown
) {
	const iteration = isNumber(pagerIteration) ? [pagerIteration] : undefined;
	//const iteration = pagerIteration ? [pagerIteration] : undefined;

	if (definition.componentType === 'CheckboxGroup') {
		return definition.responses
			.filter((response) => {
				if (!response.conditionFilter) {
					return true;
				}
				return variables.run(response.conditionFilter.value, { iteration });
			})
			.map((response) => ({
				label: response.label,
				name: response.response.name,
				id: response.id,
				checked: !!variables.get(response.response.name, iteration),
				description: response.description,
				detailLabel: response.detail?.label,
				detailValue: response.detail?.response
					? variables.get(response.detail.response.name, iteration)
					: undefined,
				onCheck: (checked: boolean) => {
					handleChanges([{ name: response.response.name, value: checked }]);
				},
				onDetailChange: response.detail?.response
					? (v: string) => {
							handleChanges([
								{ name: response.detail!.response.name, value: v },
							]);
						}
					: undefined,
			}));
	}

	if (!('options' in definition)) {
		return [];
	}

	return definition.options
		.filter((option) => {
			if (!('conditionFilter' in option) || !option.conditionFilter) {
				return true;
			}
			return variables.run(option.conditionFilter.value, { iteration });
		})
		.map((option) => ({
			label: option.label,
			description: option.description,
			value: option.value,
			checked: value === option.value,
			detailLabel: 'detail' in option ? option.detail?.label : undefined,
			onCheck: () => {
				handleChanges([
					{ name: definition.response.name, value: option.value },
				]);
			},
			detailValue:
				'detail' in option && option.detail
					? variables.get(option.detail.response.name, iteration)
					: null,
			onDetailChange:
				'detail' in option && option.detail
					? (value: string) => {
							handleChanges([{ name: option.detail!.response.name, value }]);
						}
					: null,
		}));
}
