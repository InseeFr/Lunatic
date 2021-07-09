import React, { useState } from 'react';
import PropTypes from 'prop-types';
import missingWrapper from '../missing-wrapper';
import * as lunatic from '../components';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../constants';
import { interpret } from '../../utils/to-expose';
import './table.scss';

const Table = ({
	id: tableId,
	label: tableLabel,
	preferences,
	cells,
	handleChange,
	lines: initLines,
	positioning,
	declarations,
	features,
	bindings,
	addBtnLabel,
	hideBtn,
	management,
	numberAsTextfield,
	logFunction,
}) => {
	const minLines = initLines
		? Math.max(initLines.min, U.getRosterInitLines(cells))
		: undefined;
	const maxLines = initLines ? initLines.max : undefined;
	const [lines, setLines] = useState(minLines);

	const width = `${100 / Math.max(...cells.map((line) => line.length))}%`;
	const Button = lunatic.Button;
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
					{interpret(features, logFunction)(bindings)(tableLabel)}
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
					{(minLines || minLines === 0 ? cells.slice(0, lines + 1) : cells).map(
						(line, i) => (
							<tr key={`table-${tableId}-line${i}`}>
								{line.map((component, j) => {
									const {
										label,
										headerCell,
										colspan,
										rowspan,
										componentType,
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
													label={label || ' '}
													handleChange={handleChange}
													preferences={preferences}
													positioning={positioning}
													management={management}
													features={features}
													bindings={bindings}
													{...componentProps}
													zIndex={cells.length - i || 0}
													numberAsTextfield
													logFunction={logFunction}
													shortCut={false}
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
									const interpretedLabel = interpret(
										features,
										logFunction
									)(bindings)(label);
									return headerCell ? (
										<th {...cellOptions}>{interpretedLabel}</th>
									) : (
										<td {...cellOptions}>{interpretedLabel}</td>
									);
								})}
							</tr>
						)
					)}
				</tbody>
			</table>
			{Number.isInteger(minLines) && lines < maxLines && !hideBtn && (
				<Button
					label="addLine"
					value={addBtnLabel}
					onClick={() => setLines(lines + 1)}
					id={tableId}
					logFunction={logFunction}
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
	cells: [],
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

Table.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	cells: PropTypes.array,
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

export default React.memo(missingWrapper(Table), U.areEqual);
