import React from 'react';
import type { FunctionComponent } from 'react';
import type { LunaticComponentProps } from '../type';
import {
	LunaticComponentDefinition,
	LunaticState,
} from '../../use-lunatic/type';

type OriginalProps = {
	key: number;
	rowIndex: number;
	components: LunaticComponentDefinition[];
	valueMap: Record<string, unknown>;
	handleChange: (
		response: { name: string },
		value: unknown,
		args: { index: number; [key: string]: unknown }
	) => void;
	executeExpression: LunaticState['executeExpression'];
	iteration?: number;
	linksIterations?: [number, number];
	features?: string[];
} & Pick<
	LunaticComponentProps<'Loop'>,
	'errors' | 'preferences' | 'missing' | 'shortcut' | 'id' | 'disabled'
>;

type OrchestratedProps = {
	nbRows: number;
	xAxisIterations?: number;
	disabled?: boolean;
	handleChange: (
		response: { name: string },
		value: unknown,
		args: { index: number; [key: string]: unknown }
	) => void;
} & Pick<
	OriginalProps,
	| 'id'
	| 'components'
	| 'valueMap'
	| 'features'
	| 'missing'
	| 'shortcut'
	| 'preferences'
	| 'executeExpression'
	| 'iteration'
	| 'errors'
>;

function createRowOrchestrator(Row: FunctionComponent<OriginalProps>) {
	return function RowOrchestrator({
		id,
		components,
		nbRows,
		valueMap,
		handleChange,
		features,
		missing,
		shortcut,
		preferences,
		executeExpression,
		iteration,
		xAxisIterations,
		errors,
		disabled,
	}: OrchestratedProps) {
		if (nbRows <= 0) {
			return null;
		}
		const items = new Array(nbRows).fill(null);
		return (
			<>
				{items.map((_, index) => {
					const linksIterations = xAxisIterations
						? ([
								Math.trunc(index / xAxisIterations),
								index % xAxisIterations,
						  ] as [number, number])
						: undefined;
					return (
						<Row
							key={index}
							id={id}
							rowIndex={index}
							components={components}
							valueMap={valueMap}
							handleChange={handleChange}
							executeExpression={executeExpression}
							iteration={iteration}
							linksIterations={linksIterations}
							disabled={disabled}
							/** */
							features={features}
							shortcut={shortcut}
							preferences={preferences}
							missing={missing}
							errors={errors}
						/>
					);
				})}
			</>
		);
	};
}

export default createRowOrchestrator;
