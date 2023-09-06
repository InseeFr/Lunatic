import React, { useCallback } from 'react';
import { OrchestratedComponent } from '../../commons';
import { LunaticBaseProps } from '../../type';
import { LunaticComponentDefinition } from '../../../use-lunatic/type';
import { getComponentValue } from '../../../utils/get-component-value';

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
				const id = `${component.id}-${rowIndex}`;
				const value = getComponentValue(component, valueMap, rowIndex);
				return (
					<OrchestratedComponent
						component={component}
						key={id}
						handleChange={handleChangeRow}
						features={features}
						missing={missing}
						shortcut={shortcut}
						management={management}
						value={value}
						id={id}
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

export default Row;
