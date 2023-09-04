import React, { ReactNode, useCallback } from 'react';
import { OrchestratedComponent } from '../../commons';
import { LunaticBaseProps } from '../../type';
import { LunaticComponentDefinition } from '../../../use-lunatic/type';
import { objectMap } from '../../../utils/object';

type Props = {
	valueMap?: Record<string, unknown>;
	features?: string[];
	rowIndex: number;
	disabled?: boolean;
	handleChange: (
		response: { name: string },
		value: unknown,
		args: { index: number; [key: string]: unknown }
	) => void;
	missing?: LunaticBaseProps['missing'];
	management?: LunaticBaseProps['management'];
	executeExpression: LunaticBaseProps['executeExpression'];
	errors?: LunaticBaseProps['errors'];
	components: LunaticComponentDefinition[];
	preferences?: LunaticBaseProps['preferences'];
	shortcut?: LunaticBaseProps['shortcut'];
};

function Row({
	components,
	valueMap = {},
	handleChange,
	features,
	missing,
	shortcut,
	management,
	preferences,
	rowIndex,
	executeExpression,
	errors,
	disabled,
}: Props) {
	const handleChangeRow = useCallback<LunaticBaseProps['handleChange']>(
		function (response, value) {
			handleChange(response, value, { index: rowIndex });
		},
		[handleChange, rowIndex]
	);

	return (
		<>
			{components.map((component) => {
				const { id } = component;
				const idComponent = `${id}-${rowIndex}`;
				let value = undefined;

				if (hasResponse(component)) {
					const { name } = component.response;
					const valueArray = valueMap[name];
					if (Array.isArray(valueArray)) {
						value = valueArray[rowIndex] || '';
					}
				}

				// For checkbox group we need to send the map of values
				if (hasResponses(component)) {
					value = objectMap(valueMap, (k, v) => {
						if (Array.isArray(v)) {
							return [k, v[rowIndex]];
						}
						return [k, v];
					});
				}

				return (
					<OrchestratedComponent
						component={component}
						key={idComponent}
						handleChange={handleChangeRow}
						features={features}
						missing={missing}
						shortcut={shortcut}
						management={management}
						value={value}
						id={idComponent}
						preferences={preferences}
						iteration={rowIndex}
						executeExpression={executeExpression}
						errors={errors}
						disabled={disabled}
					/>
				);
			})}
		</>
	);
}

function hasResponse(
	component: unknown
): component is { response: { name?: string } } {
	return (
		!!component && typeof component === 'object' && 'response' in component
	);
}

function hasResponses(component: unknown): component is {
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

export default Row;
