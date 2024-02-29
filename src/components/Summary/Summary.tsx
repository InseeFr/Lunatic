import type { LunaticComponentProps, VtlExpression } from '../type';
import { type ReactNode } from 'react';
import { slottableComponent } from '../shared/HOC/slottableComponent';

type Section = {
	id?: string;
	title?: ReactNode;
	values?: Array<{ label: ReactNode; value: ReactNode; id: string }>;
};

/**
 * Summarize the responses done by the user
 */
export function Summary(props: LunaticComponentProps<'Summary'>) {
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
							values: interpretResponses(
								responses,
								executeExpression,
								iteration
							),
							title: interpretTitle(title, executeExpression, iteration),
							id: id,
						};
					});
				return [...acc, ...elements];
			}
		}
		if (responses) {
			const element = {
				title: interpretTitle(title, executeExpression),
				values: interpretResponses(responses, executeExpression, undefined),
				id: id,
			};
			return [...acc, element];
		}
		return acc;
	}, [] as Section[]);

	return (
		<div className="lunatic-summary-container">
			{label && <SummaryTitle label={label} />}
			<SummaryResponses sections={compiledSections} />
		</div>
	);
}

/**
 * Title displayed on top of the Summary
 */
export const SummaryTitle = slottableComponent<{ label: ReactNode }>(
	'SummaryTitle',
	({ label }) => <div className="lunatic-summary-label">{label}</div>
);

export const SummaryResponses = slottableComponent<{ sections: Section[] }>(
	'SummaryResponses',
	({ sections }) => {
		return (
			<>
				{sections.map((section, index) => (
					<div
						key={`${section.id}-${index}`}
						className="lunatic-summary-responses-iteration"
					>
						{section.title}
						{section.values && (
							<ul>
								{section.values.map((value) => (
									<li key={`response-${index}`}>
										{value.label} : {value.value}
									</li>
								))}
							</ul>
						)}
					</div>
				))}
			</>
		);
	}
);

function interpretTitle(
	title: VtlExpression | undefined,
	executeExpression: LunaticComponentProps<'Summary'>['executeExpression'],
	iteration?: number | undefined
): ReactNode {
	if (!title && iteration) {
		return `Valeur pour ${iteration + 1}`;
	}
	if (!title) {
		return `Valeurs renseignés :`;
	}
	const hasIteration = iteration || iteration === 0;
	return executeExpression(title, hasIteration ? { iteration } : {});
}

function interpretResponses(
	responses: Array<{ label: VtlExpression; value: VtlExpression; id: string }>,
	executeExpression: LunaticComponentProps<'Summary'>['executeExpression'],
	iteration?: number
) {
	if (!responses) {
		return [];
	}
	const option = iteration || iteration === 0 ? iteration : undefined;
	return responses.map((r) => ({
		label: executeExpression<ReactNode>(r.label, { iteration: option }),
		value: executeExpression<ReactNode>(r.value, { iteration: option }),
		id: r.id,
	}));
}
