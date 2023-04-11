import React from 'react';
import { OrchestratedComponent } from '../commons';
import { Td } from '../commons/components/html-table';
import { LunaticBaseProps } from '../type';
import type {
	LunaticComponentDefinition,
	LunaticExpression,
} from '../../use-lunatic/type';

function collecteResponseValue(
	response: { name: string } | undefined,
	value: Record<string, unknown> | undefined
): unknown {
	if (
		typeof response === 'object' &&
		'name' in response &&
		value &&
		response.name in value
	) {
		return value[response.name];
	}

	return undefined;
}

function collecteArrayResponseValue(
	responses: Array<{ name: string } | undefined>,
	value: Record<string, unknown>
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
	component: {
		responses?: Array<{ name: string }>;
		response?: { name: string };
	},
	value: Record<string, unknown>
) {
	const { response, responses } = component;

	if (Array.isArray(responses)) {
		return collecteArrayResponseValue(responses, value);
	}
	if (typeof response === 'object') {
		return collecteResponseValue(response, value);
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
