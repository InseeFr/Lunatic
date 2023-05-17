import React from 'react';
import { OrchestratedComponent } from '../commons';
import { Td } from '../commons/components/html-table';
import { LunaticBaseProps } from '../type';
import type {
	LunaticComponentDefinition,
	LunaticExpression,
} from '../../use-lunatic/type';

function collecteResponseValue(
	response: unknown,
	value?: Record<string, unknown>
): unknown {
	if (
		value &&
		typeof response === 'object' &&
		response &&
		'name' in response &&
		typeof response.name === 'string' &&
		response.name in value
	) {
		return value[response.name];
	}

	return undefined;
}

function collecteArrayResponseValue(
	responses: unknown[],
	value?: Record<string, unknown>
): unknown[] {
	const [response, ...rest] = responses;

	if (response) {
		return [
			collecteResponseValue(response, value),
			collecteArrayResponseValue(rest, value),
		];
	}
	return [];
}

function collecteValue(
	component: LunaticComponentDefinition,
	value?: Record<string, unknown>
) {
	if ('responses' in component && Array.isArray(component.responses)) {
		return collecteArrayResponseValue(
			component.responses.map((v) => v.response),
			value
		);
	}
	if ('response' in component) {
		return collecteResponseValue(component.response, value);
	}
	return {};
}

type Props = {
	content:
		| LunaticComponentDefinition
		| { label: LunaticExpression; rowspan?: number; colspan?: number };
	id: string;
	executeExpression: LunaticBaseProps['executeExpression'];
	iteration?: number;
	value: Record<string, unknown>;
	row?: string | number;
	index?: string | number;
	handleChange: LunaticBaseProps['handleChange'];
	errors: LunaticBaseProps['errors'];
};
function Cell({
	content,
	id,
	executeExpression,
	iteration,
	value,
	row,
	index,
	handleChange,
	errors,
}: Props) {
	if ('componentType' in content) {
		const valueField = collecteValue(content, value);
		return (
			<Td id={id} row={row} index={index}>
				<OrchestratedComponent
					id={id}
					component={content}
					handleChange={handleChange}
					value={valueField}
					executeExpression={executeExpression}
					iteration={iteration}
					errors={errors}
				/>
			</Td>
		);
	}

	const getLabel = () => {
		try {
			return executeExpression(content.label, { iteration });
		} catch (e) {
			return (e as any).toString();
		}
	};

	return (
		<Td
			id={id}
			row={row}
			index={index}
			rowSpan={content.rowspan}
			colSpan={content.colspan}
		>
			{getLabel()}
		</Td>
	);
}

export default Cell;
