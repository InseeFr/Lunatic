import { LunaticComponentProps, VtlExpression } from '../type';
import SummaryTitle from './html/summary-title';
import SummaryLoop from './html/summary-loop';
import SummaryContainer from './html/summary-container';
import { ReactNode } from 'react';

export type SummaryLoopEntry = {
	label: ReactNode;
	value: ReactNode;
	title?: ReactNode;
};

function compileLoop(
	loop: Array<{ label: VtlExpression; value: VtlExpression }>,
	executeExpression: (
		expression: VtlExpression,
		args?: {
			iteration?: number | undefined;
		}
	) => unknown,

	iteration: number
) {
	return loop.map(function ({ label, value }) {
		return {
			label: executeExpression(label, { iteration }),
			value: executeExpression(value, { iteration }),
		} as SummaryLoopEntry;
	});
}

function compileLoopTitle(
	executeExpression: (
		expression: VtlExpression,
		args?: {
			iteration?: number | undefined;
		}
	) => unknown,
	iteration: number,
	loopTitle?: VtlExpression
): ReactNode {
	return loopTitle ? (
		(executeExpression(loopTitle, { iteration }) as ReactNode)
	) : (
		<>`Valeur pour ${iteration + 1}`</>
	);
}

function LunaticSummary(props: LunaticComponentProps<'Summary'>) {
	const { executeExpression, iterations, label, loop, loopTitle } = props;
	let rows: Array<{ values: SummaryLoopEntry[]; title: ReactNode }> = [];

	if (typeof iterations === 'number' && iterations > 0 && loop) {
		rows = Array(iterations)
			.fill(null)
			.map(function (_, iteration) {
				const title = compileLoopTitle(executeExpression, iteration, loopTitle);
				return {
					values: compileLoop(loop, executeExpression, iteration),
					title,
				};
			});
	}

	return (
		<SummaryContainer>
			<SummaryTitle label={label} />
			<SummaryLoop rows={rows} />
		</SummaryContainer>
	);
}

export default LunaticSummary;
