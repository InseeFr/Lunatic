import type {
	LunaticChangesHandler,
	LunaticComponentDefinition,
	LunaticState,
} from '../type';
import type { ReactNode } from 'react';
import type { DeepTranslateExpression } from '../commons/fill-components/fill-component-expressions';
import { isNumber } from '../../utils/number';
import type { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';
import { LunaticLogger } from '../logger/type';
import { VtlExpression } from '../../components/type';

/* Used for radio option and checkbox one option */
export type InterpretedOption = {
	label: ReactNode;
	value?: string;
	checked?: boolean;
	description?: ReactNode;
	detailLabel?: ReactNode;
	detailValue?: string | null;
	detailMaxLength?: number;
	shouldBeFiltered?: boolean;
	onDetailChange?: (value: string) => void;
	onCheck?: () => void;
	onUncheck?: () => void;
};

/**
 * Compute options for checkboxes / radios / dropdown
 */
export function computeOptionsFromComponent(
	definition: DeepTranslateExpression<LunaticComponentDefinition>,
	{
		variables,
		handleChanges,
		pagerIteration,
		value,
		logger,
		disableFilters,
		shouldParentBeFiltered,
	}: {
		variables: LunaticVariablesStore;
		handleChanges: LunaticChangesHandler;
		pagerIteration: LunaticState['pager']['iteration'];
		value: unknown;
		logger: LunaticLogger;
		disableFilters?: boolean;
		shouldParentBeFiltered?: boolean;
	}
) {
	const iteration = isNumber(pagerIteration) ? [pagerIteration] : undefined;

	if (definition.componentType === 'CheckboxGroup') {
		return definition.responses
			.filter((response) => {
				if (disableFilters || !response.conditionFilter) {
					return true;
				}
				return !isFilteredOutOption(
					variables,
					iteration,
					logger,
					response.conditionFilter
				);
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
				detailMaxLength: response.detail?.maxLength,
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
				shouldBeFiltered:
					shouldParentBeFiltered ||
					isFilteredOutOption(
						variables,
						iteration,
						logger,
						response.conditionFilter
					),
			}));
	}

	// options based on another variable
	if ('optionSource' in definition && definition.optionSource) {
		return computeOptionsFromSource(definition.optionSource, {
			variables,
			value,
			handleChanges,
			responseName: definition.response.name,
			logger,
			shouldParentBeFiltered,
			optionFilter: definition.optionFilter,
		});
	}

	if (!('options' in definition)) {
		return [];
	}

	if (!definition.options) {
		return [];
	}

	return definition.options
		.filter((option) => {
			if (
				disableFilters ||
				!('conditionFilter' in option) ||
				!option.conditionFilter
			) {
				return true;
			}
			return !isFilteredOutOption(
				variables,
				iteration,
				logger,
				option.conditionFilter
			);
		})
		.map((option) => ({
			label: option.label,
			description: option.description,
			value: option.value,
			checked: value === option.value,
			detailLabel: 'detail' in option ? option.detail?.label : undefined,
			detailValue:
				'detail' in option && option.detail
					? variables.get(option.detail.response.name, iteration)
					: null,
			detailMaxLength:
				'detail' in option ? option.detail?.maxLength : undefined,
			onCheck: () => {
				handleChanges([
					{ name: definition.response.name, value: option.value },
				]);
			},
			// for CheckboxOne, we allow uncheck
			onUncheck: () => {
				handleChanges([{ name: definition.response.name, value: null }]);
			},
			onDetailChange:
				'detail' in option && option.detail
					? (value: string) => {
							handleChanges([{ name: option.detail!.response.name, value }]);
						}
					: null,
			shouldBeFiltered:
				shouldParentBeFiltered ||
				('conditionFilter' in option &&
					isFilteredOutOption(
						variables,
						iteration,
						logger,
						option.conditionFilter
					)),
		}));
}

/**
 * Get all options from a source variable, applying filters.
 */
function computeOptionsFromSource(
	optionSource: string,
	{
		variables,
		value,
		handleChanges,
		responseName,
		logger,
		shouldParentBeFiltered,
		optionFilter,
	}: {
		variables: LunaticVariablesStore;
		value: unknown;
		handleChanges: LunaticChangesHandler;
		responseName: string;
		logger: LunaticLogger;
		shouldParentBeFiltered?: boolean;
		optionFilter?: VtlExpression;
	}
): InterpretedOption[] {
	// we don't know the type of the optionSource values (string, numbers, boolean)
	const optionValues = variables.get<unknown>(optionSource);
	if (!optionValues) {
		return [];
	}

	const normalizedValues = Array.isArray(optionValues)
		? optionValues
		: [optionValues];

	return normalizedValues
		.filter((option, index) => {
			// option is an empty value, we remove it from the options list
			if (option === null || option === undefined) {
				return false;
			}
			// no filter expression, we keep the option
			if (!optionFilter) {
				return true;
			}
			// apply filter expression on option (applied to its iteration)
			return !isFilteredOutOption(variables, [index], logger, optionFilter);
		})
		.map((option) => {
			return {
				label: String(option),
				value: option,
				checked: value === option,
				onCheck: () => {
					handleChanges([{ name: responseName, value: option }]);
				},
				onUncheck: () => {
					handleChanges([{ name: responseName, value: null }]);
				},
				shouldBeFiltered: shouldParentBeFiltered,
			};
		});
}

/**
 * Check if an option should be filtered, depending on its conditionFilter.
 */
function isFilteredOutOption(
	variables: LunaticVariablesStore,
	iteration: number[] | undefined,
	logger: LunaticLogger,
	conditionFilter?: VtlExpression
): boolean {
	if (!conditionFilter) return false;
	try {
		return !variables.run(conditionFilter.value, { iteration });
	} catch (e) {
		logger({ type: 'ERROR', error: e as Error });
		return false;
	}
}
