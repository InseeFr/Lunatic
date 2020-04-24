import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as lunatic from '../../components';
import Declarations from '../../declarations';
import * as U from '../../../utils/lib';
import * as C from '../../../utils/constants';
import { interpret, getVariableFromResponses } from '../../../utils/to-expose';
import { buildTableComponents } from './build-components';

const Table = ({
	id: tableId,
	label: tableLabel,
	preferences,
	headers,
	components,
	handleChange,
	lines: initLines,
	positioning,
	declarations,
	features,
	bindings,
	addBtnLabel,
	hideBtn,
	tooltip,
}) => {
	const minLines = initLines
		? Math.max(initLines.min, U.getRosterVectorInitLines(components))
		: undefined;
	const maxLines = initLines ? initLines.max : undefined;
	const [lines, setLines] = useState(minLines);

	const width = `${100 / Math.max(...components.map(line => line.length))}%`;
	const Button = lunatic.Button;

	const uiComponents = buildTableComponents(headers)(components);

	const onChange = (up, index) => {
		const [key, value] = Object.entries(up)[0];
		const previousValue = getVariableFromResponses(components)[key][
			'COLLECTED'
		];
		const newValue = previousValue.map((v, i) => (i === index ? value : v));
		handleChange({ [key]: newValue });
	};

	const addLine = () => {
		setLines(lines + 1);
		const involvedVariables = U.getInvolvedVariables(components);
		const toHandle = involvedVariables.reduce(
			(acc, iv) => ({
				...acc,
				[iv]: [...bindings[iv], null],
			}),
			{}
		);
		handleChange(toHandle);
	};

	return (
		<>
			<Declarations
				id={tableId}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			{tableLabel && (
				<label
					htmlFor={`table-one-axis-${tableId}`}
					id={`table-one-axis-label-${tableId}`}
				>
					{interpret(features)(bindings)(tableLabel)}
				</label>
			)}
			<Declarations
				id={tableId}
				type={C.AFTER_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<table id={`table-${tableId}`} className="table-lunatic">
				<tbody>
					{(minLines || minLines === 0
						? uiComponents.slice(0, lines + 1)
						: uiComponents
					).map((line, i) => (
						<tr key={`table-${tableId}-line${i}`}>
							{line.map((component, j) => {
								const {
									label,
									headerCell,
									colspan,
									rowspan,
									componentType,
									id,
									...componentProps
								} = component;
								if (componentType) {
									const Component = lunatic[componentType];
									return (
										<td
											key={`table-${tableId}-line${i}-cell-${j}`}
											style={{ width }}
										>
											<Component
												{...componentProps}
												id={`${id}-row-${i}`}
												label={label}
												handleChange={v => onChange(v, i - 1)}
												preferences={preferences}
												positioning={positioning}
												tooltip={tooltip}
												features={features}
												bindings={bindings}
												zIndex={uiComponents.length - i || 0}
											/>
										</td>
									);
								}
								const cellOptions = {
									key: `table-${tableId}-line${i}-cell-${j}`,
									style: { width },
									colSpan: colspan || 1,
									rowSpan: rowspan || 1,
								};
								const interpretedLabel = interpret(features)(bindings)(label);
								return headerCell ? (
									<th {...cellOptions}>{interpretedLabel}</th>
								) : (
									<td {...cellOptions}>{interpretedLabel}</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
			{Number.isInteger(minLines) && lines < maxLines && !hideBtn && (
				<Button
					label="addLine"
					value={addBtnLabel}
					disabled={false}
					onClick={addLine}
				/>
			)}
			<Declarations
				id={tableId}
				type={C.DETACHABLE}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
		</>
	);
};

Table.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	components: [],
	lines: {},
	positioning: 'DEFAULT',
	declarations: [],
	features: [],
	bindings: {},
	addBtnLabel: 'Add a line',
	tooltip: false,
	hideBtn: false,
	style: {},
};

Table.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	components: PropTypes.array,
	handleChange: PropTypes.func.isRequired,
	lines: U.linesPropTypes,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	addBtnLabel: PropTypes.string,
	hideBtn: PropTypes.bool,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default Table;
