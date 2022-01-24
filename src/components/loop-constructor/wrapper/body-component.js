import React from 'react';
import * as lunatic from '../../components';
import * as U from '../../../utils/lib';
import { interpret } from '../../../utils/to-expose';
import { buildContentForLoopConstructor } from './build-components';

const BodyComponent = ({
	componentType,
	mainId,
	headers,
	components,
	bindings,
	width,
	preferences,
	positioning,
	management,
	features,
	setTodo,
	logFunction,
	...otherProps
}) => {
	const uiComponents = buildContentForLoopConstructor({
		components,
		headers,
	});
	const featuresWithoutMD = features.filter((f) => f !== 'MD');
	if (componentType === 'RosterForLoop')
		return (
			<table id={`table-${mainId}`} className="table-lunatic">
				<tbody>
					{uiComponents.map((row, i) => (
						<tr key={`table-${mainId}-row${i}`}>
							{row.map((component, j) => {
								const {
									label,
									headerCell,
									colspan,
									rowspan,
									componentType,
									id,
									rowNumber,
									conditionFilter,
									...componentProps
								} = component;
								const localBindings =
									U.buildBindingsForDeeperComponents(rowNumber)(bindings);
								if (conditionFilter) {
									const { value = '' } = conditionFilter;
									if (!interpret(featuresWithoutMD)(localBindings)(value))
										return null;
								}
								if (componentType) {
									const Component = lunatic[componentType];
									return (
										<td
											key={`table-${mainId}-row-${i}-cell-${j}`}
											style={{ width }}
										>
											<Component
												{...otherProps}
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
												fullBindings={bindings}
												missingLoopIteration={i}
												zIndex={uiComponents.length - i || 0}
												logFunction={logFunction}
												focused={i === 0 && j === 0}
											/>
										</td>
									);
								}
								const cellOptions = {
									key: `table-${mainId}-row-${i}-cell-${j}`,
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
					))}
				</tbody>
			</table>
		);
	else
		return (
			<div className="block-for-loop">
				{uiComponents.map((row, i) =>
					row.map(({ componentType, id, label, ...componentProps }) => {
						const Component = lunatic[componentType];
						const localBindings =
							U.buildBindingsForDeeperComponents(i)(bindings);
						// ensure to have only N-1 missingResponse
						const { missingResponse, conditionFilter } = componentProps;
						if (conditionFilter) {
							const { value = '' } = conditionFilter;
							if (!interpret(featuresWithoutMD)(localBindings)(value))
								return null;
						}
						return (
							<div className="block-component" key={`${id}-row-${i}`}>
								<Component
									{...otherProps}
									{...componentProps}
									missingResponse={missingResponse}
									id={`${id}-row-${i}`}
									label={label}
									handleChange={(up) => {
										setTodo({ up, rowNumber: i });
									}}
									preferences={preferences}
									positioning={positioning}
									management={management}
									features={features}
									bindings={localBindings}
									fullBindings={bindings}
									missingLoopIteration={i}
									logFunction={logFunction}
									focused={i === 0}
								/>
							</div>
						);
					})
				)}
			</div>
		);
};

export default BodyComponent;
