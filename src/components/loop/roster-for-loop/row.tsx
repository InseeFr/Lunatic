import { useCallback } from 'react';
import { Tr, Td } from '../../commons/components/html-table';
import { OrchestratedComponent } from '../../commons';
import type { LunaticBaseProps } from '../../type';
import type { LunaticComponentDefinition } from '../../../use-lunatic/type';

type Props = {
	id: string;
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

const emptyValue = {};

function Row({
	id,
	components,
	valueMap = emptyValue,
	rowIndex,
	handleChange,
	features,
	missing,
	shortcut,
	management,
	preferences,
	executeExpression,
	errors,
	disabled,
}: Props) {
	const handleChangeRow = useCallback<
		(response: { name: string }, value: unknown) => void
	>(
		function (response, value) {
			handleChange(response, value, { index: rowIndex });
		},
		[handleChange, rowIndex]
	);

	if (!Array.isArray(components)) {
		return <Tr id={id}></Tr>;
	}

	return (
		<Tr id={id} row={rowIndex}>
			{components.map(function (component) {
				if (!('response' in component)) {
					return null;
				}
				const { response, id } = component;
				const idComponent = `${id}-${rowIndex}`;
				let value = undefined;
				const key = `${id}-${rowIndex}`;
				if (response) {
					const { name } = response;
					if (name in valueMap) {
						const v = valueMap[name];
						if (Array.isArray(v)) {
							value = v[rowIndex] || '';
						} else {
							value = '';
						}
					}
				}

				return (
					<Td id={idComponent} key={key}>
						<OrchestratedComponent
							component={component}
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
							disabled={disabled}
							errors={errors}
						/>
					</Td>
				);
			})}
		</Tr>
	);
}

export default Row;
