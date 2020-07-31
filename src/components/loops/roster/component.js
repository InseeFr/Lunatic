import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as lunatic from '../../components';
import Declarations from '../../declarations';
import * as U from '../../../utils/lib';
import * as C from '../../../constants';
import { interpret } from '../../../utils/to-expose';
import { buildRosterUIComponents } from './build-components';

const RosterForLoop = ({
	id: tableId,
	label: tableLabel,
	preferences,
	headers,
	components,
	handleChange,
	lines,
	positioning,
	declarations,
	features,
	bindings,
	addBtnLabel,
	hideBtn,
	management,
}) => {
	const [todo, setTodo] = useState({});
	const minLines = Math.max(
		lines.min || 0,
		U.getRosterForLoopInitLines(components)
	);
	const maxLines = lines ? lines.max : undefined;

	const width = `${100 / Math.max(...components.map((row) => row.length))}%`;
	const Button = lunatic.Button;
	const uiComponents = buildRosterUIComponents(headers)(components);
	const involvedVariables = U.getInvolvedVariables(components);

	useEffect(() => {
		if (Object.keys(todo).length !== 0) {
			const { up, rowNumber } = todo;
			const [key, value] = Object.entries(up)[0];
			const previousValue = bindings[key];
			const newValue = previousValue.map((v, i) =>
				i === rowNumber ? value : v
			);
			handleChange({ [key]: newValue });
			setTodo({});
		}
	}, [bindings, todo, handleChange]);

	const addLine = () => {
		const toHandle = involvedVariables.reduce(
			(acc, { name: iv, depth }) => ({
				...acc,
				[iv]: [...bindings[iv], U.buildEmptyValue(depth)],
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
					{uiComponents.map((row, i) => (
						<tr key={`table-${tableId}-row${i}`}>
							{row.map((component, j) => {
								const {
									label,
									headerCell,
									colspan,
									rowspan,
									componentType,
									id,
									rowNumber,
									...componentProps
								} = component;
								const localBindings = U.buildBindingsForDeeperComponents(
									rowNumber
								)(bindings);
								if (componentType) {
									const Component = lunatic[componentType];
									return (
										<td
											key={`table-${tableId}-row-${i}-cell-${j}`}
											style={{ width }}
										>
											<Component
												{...componentProps}
												id={`${id}-row-${i}`}
												label={label}
												handleChange={(up) => {
													setTodo({ up, rowNumber });
												}}
												preferences={preferences}
												positioning={positioning}
												management={management}
												features={features}
												bindings={localBindings}
												zIndex={uiComponents.length - i || 0}
											/>
										</td>
									);
								}
								const cellOptions = {
									key: `table-${tableId}-row-${i}-cell-${j}`,
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
			{!hideBtn && (
				<Button
					label="addLine"
					value={addBtnLabel}
					disabled={
						(Number.isInteger(minLines) && minLines === maxLines) ||
						U.lastRosterForLoopLineIsEmpty(bindings)(involvedVariables)
					}
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

RosterForLoop.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	components: [],
	lines: {},
	positioning: 'DEFAULT',
	declarations: [],
	features: [],
	bindings: {},
	addBtnLabel: 'Add a line',
	management: false,
	hideBtn: false,
	style: {},
};

RosterForLoop.propTypes = {
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
	management: PropTypes.bool,
	style: PropTypes.object,
};

export default React.memo(RosterForLoop, U.areEqual);
