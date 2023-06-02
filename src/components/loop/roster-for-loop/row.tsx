import { memo, useCallback } from 'react';
import { Tr, Td } from '../../commons/components/html-table';

import { OrchestratedComponent } from '../../commons';
import { LunaticBaseProps } from '../../type';
import { LunaticComponentDefinition } from '../../../use-lunatic/type';
import { useDidChange } from '../../../hooks/use-did-change';

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
					<RowCell
						id={idComponent}
						key={key}
						component={component}
						handleChange={handleChangeRow}
						features={features}
						missing={missing}
						shortcut={shortcut}
						management={management}
						value={value}
						preferences={preferences}
						rowIndex={rowIndex}
						executeExpression={executeExpression}
						errors={errors}
					/>
				);
			})}
		</Tr>
	);
}

/**
 * Memoïzed version of a cell (for optimisation)
 */
const RowCell = memo<
	Pick<
		Props,
		| 'id'
		| 'features'
		| 'missing'
		| 'shortcut'
		| 'management'
		| 'preferences'
		| 'rowIndex'
		| 'executeExpression'
		| 'errors'
	> & {
		value: unknown;
		component: LunaticComponentDefinition;
		handleChange: (response: { name: string }, value: unknown) => void;
	}
>(
	({
		id,
		component,
		handleChange,
		features,
		missing,
		shortcut,
		management,
		value,
		preferences,
		rowIndex,
		executeExpression,
		errors,
	}) => {
		return (
			<Td id={id}>
				<OrchestratedComponent
					component={component}
					handleChange={handleChange}
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
				/>
			</Td>
		);
	}
);

export default Row;
