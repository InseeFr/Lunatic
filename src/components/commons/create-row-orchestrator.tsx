import React from 'react';
import { FunctionComponent } from 'react';
import { LunaticComponentProps } from '../type';
import { LunaticState } from '../../use-lunatic/type';

type OriginalProps = {
	key: number;
	rowIndex: number;
	components: FunctionComponent<LunaticComponentProps>[];
	valueMap: Record<string, unknown>;
	handleChange: LunaticComponentProps<'Loop'>['handleChange'];
	executeExpression: LunaticState['executeExpression'];
	iteration?: number;
	linksIterations: [number, number];
	features?: string[];
} & Pick<
	LunaticComponentProps<'Loop'>,
	'errors' | 'handleChange' | 'preferences' | 'missing' | 'shortcut' | 'id'
>;

type OrchestratedProps = {
	nbRows: number;
	xAxisIterations: number;
} & Pick<
	OriginalProps,
	| 'id'
	| 'components'
	| 'valueMap'
	| 'handleChange'
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
	}: OrchestratedProps) {
		if (nbRows > 0) {
			return new Array(nbRows).fill(null).map(function (_, index) {
				const i = Math.trunc(index / xAxisIterations);
				const j = index % xAxisIterations;
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
						linksIterations={[i, j]}
						/** */
						features={features}
						shortcut={shortcut}
						preferences={preferences}
						missing={missing}
						errors={errors}
					/>
				);
			});
		}
		return null;
	};
}

export default createRowOrchestrator;
