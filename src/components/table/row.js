import React from 'react';
import { OrchestratedComponent } from '../commons';
import { Tr as HtmlTr, Td as HtmlTd } from '../commons/components/html-table';

function collecteResponseValue(response, value) {
	if (typeof response === 'object') {
		const { name } = response;
		if (name in value) {
			return value[name];
		}
	}

	return undefined;
}

function collecteArrayResponseValue(responses, value) {
	const [response, ...rest] = responses;

	if (response) {
		return [
			collecteResponseValue(response, value),
			collecteArrayResponseValue(rest, value),
		];
	}
	return [];
}

function collecteValue(component, value) {
	const { response, responses } = component;

	if (Array.isArray(responses)) {
		return collecteArrayResponseValue(responses, value);
	}
	if (typeof response === 'object') {
		return collecteResponseValue(response, value);
	}
	return {};
}

function ComponentCell({
	component,
	id,
	custom,
	executeExpression,
	value,
	handleChange,
	iteration,
}) {
	const valueField = collecteValue(component, value);
	return (
		<OrchestratedComponent
			id={id}
			component={component}
			handleChange={handleChange}
			value={valueField}
			custom={custom}
			executeExpression={executeExpression}
			iteration={iteration}
		/>
	);
}

function Cell({
	content,
	id,
	custom,
	executeExpression,
	iteration,
	value,
	row,
	index,
	handleChange,
}) {
	const { label, componentType, rowspan, colspan } = content;

	if (componentType) {
		return (
			<HtmlTd
				id={id}
				row={row}
				index={index}
				rowSpan={rowspan}
				colSpan={colspan}
			>
				<ComponentCell
					component={content}
					id={id}
					custom={custom}
					executeExpression={executeExpression}
					handleChange={handleChange}
					value={value}
					iteration={iteration}
				/>
			</HtmlTd>
		);
	}
	if (label) {
		return (
			<HtmlTd
				id={id}
				row={row}
				index={index}
				rowSpan={rowspan}
				colSpan={colspan}
			>
				{label}
			</HtmlTd>
		);
	}
	return (
		<HtmlTd
			id={id}
			row={row}
			index={index}
			rowSpan={rowspan}
			colSpan={colspan}
		></HtmlTd>
	);
}

function Row({
	id,
	custom,
	columns,
	executeExpression,
	value,
	row,
	iteration,
	handleChange,
}) {
	const content = columns.map(function (content, index) {
		return (
			<Cell
				id={id}
				content={content}
				custom={custom}
				value={value}
				executeExpression={executeExpression}
				handleChange={handleChange}
				iteration={iteration}
				row={row}
				index={index}
				key={index}
			/>
		);
	});
	return (
		<HtmlTr id={id} custom={custom} row={row}>
			{content}
		</HtmlTr>
	);
}

export default Row;
