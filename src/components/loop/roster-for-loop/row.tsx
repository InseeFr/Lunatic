import { memo, useCallback } from 'react';
import { Td, Tr } from '../../commons/components/html-table';

import {
	LunaticComponentDefinition,
	LunaticState,
} from '../../../use-lunatic/type';
import { OrchestratedComponent } from '../../commons';
import { LunaticBaseProps } from '../../type';

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
	getSuggesterStatus: LunaticState['getSuggesterStatus'];
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
	getSuggesterStatus,
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
				if (!('response' in component || 'responses' in component)) {
					return null;
				}

				const { id } = component;
				const idComponent = `${id}-${rowIndex}`;
				const key = `${id}-${rowIndex}`;
				let value;

				if ('responses' in component) {
					value = {};
					const { responses } = component;
					responses?.forEach((res) => {
						const { name } = res?.response;
						if (name in valueMap) {
							const v = valueMap[name];
							if (Array.isArray(v)) {
								value[name] = v[rowIndex] || '';
							} else {
								value[name] = '';
							}
						}
					});
				}
				if ('response' in component) {
					const { response } = component;
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
				}

				console.log('My values', value);
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
						getSuggesterStatus={getSuggesterStatus}
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
		| 'getSuggesterStatus'
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
		getSuggesterStatus,
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
					getSuggesterStatus={getSuggesterStatus}
					errors={errors}
				/>
			</Td>
		);
	}
);

export default Row;
