import type { LunaticComponentProps, VtlExpression } from '../type';
import SummaryTitle from './html/summary-title';
import { SummaryContainer } from './html/summary-container';
import { type ReactNode } from 'react';
import SummaryResponses from './html/summary-responses';

export type SummaryResponsesEntry = {
	label: ReactNode;
	value: ReactNode;
	id: string;
};

type CompiledTitleProps = {
	executeExpression: (
		expression: VtlExpression,
		args?: {
			iteration?: number | undefined;
		}
	) => ReactNode;
	iteration?: number;
	title?: VtlExpression;
};

function compileResponses(
	responses: Array<{ label: VtlExpression; value: VtlExpression; id: string }>,
	executeExpression: (
		expression: VtlExpression,
		args?: {
			iteration?: number | undefined;
		}
	) => ReactNode,
	iteration?: number
) {
	if (!responses) {
		return [];
	}
	const option = iteration || iteration === 0 ? iteration : undefined;
	return responses.map(
		(r) =>
			({
				label: executeExpression(r.label, { iteration: option }),
				value: executeExpression(r.value, { iteration: option }),
				id: r.id,
			} as SummaryResponsesEntry)
	);
}

function CompiledTitle({
	executeExpression,
	iteration,
	title,
}: CompiledTitleProps) {
	if (!title && iteration) {
		return <>{`Valeur pour ${iteration + 1}`}</>;
	}
	if (!title) {
		return <>{`Valeurs renseignés :`}</>;
	}
	const hasIteration = iteration || iteration === 0;
	return <>{executeExpression(title, hasIteration ? { iteration } : {})}</>;
}

export function LunaticSummary(props: LunaticComponentProps<'Summary'>) {
	const { executeExpression, label, sections } = props;

	const compiledSections = sections.reduce((acc, section) => {
		const { iterations, title, responses, id } = section;
		if (iterations) {
			const compiledIterations: number = executeExpression(iterations);
			if (responses) {
				const elements = Array(compiledIterations)
					.fill(null)
					.map(function (_, iteration) {
						return {
							values: compileResponses(responses, executeExpression, iteration),
							title: (
								<CompiledTitle
									executeExpression={executeExpression}
									iteration={iteration}
									title={title}
								/>
							),
							id: id,
						};
					});
				return [...acc, ...elements];
			}
		}
		if (responses) {
			const element = {
				title: (
					<CompiledTitle
						executeExpression={executeExpression}
						iteration={undefined}
						title={title}
					/>
				),
				values: compileResponses(responses, executeExpression, undefined),
				id: id,
			};
			return [...acc, element];
		}
		return acc;
	}, [] as Array<{ id?: string; title?: ReactNode; values?: Array<{ label: ReactNode; value: ReactNode; id: string }> }>);

	return (
		<SummaryContainer>
			<SummaryTitle label={label} />
			<SummaryResponses sections={compiledSections} />
		</SummaryContainer>
	);
}
