import { LunaticComponentProps, VtlExpression } from '../type';
import SummaryTitle from './html/summary-title';
import { SummaryContainer } from './html/summary-container';
import { ReactNode } from 'react';
import SummaryResponses from './html/summary-responses';

export type SummaryResponsesEntry = {
	label: ReactNode;
	value: ReactNode;
};

type CompiledTitleProps = {
  executeExpression: (
		expression: VtlExpression,
		args?: {
			iteration?: number | undefined;
		}
	) => unknown,
	iteration?: number,
	title?: VtlExpression,
}

function compileResponses(
	responses: Array<{ label: VtlExpression; value: VtlExpression }>,
	executeExpression: (
		expression: VtlExpression,
		args?: {
			iteration?: number | undefined;
		}
	) => unknown,
	iteration?: number
) {
  if (!responses) {
    return []
  }
  const option = iteration || iteration === 0 ? iteration : undefined
  console.log(iteration, responses)
  console.log(iteration || iteration === 0)
  return responses.map((r) => {
    console.log(option)
    return {
      label: executeExpression(r.label, {iteration: option}), 
      value: executeExpression(r.value, {iteration: option})
    } as SummaryResponsesEntry;
  })
}

function CompiledTitle ({
  executeExpression,
  iteration, 
  title, 
}: CompiledTitleProps) {
  if ( !title && iteration  ) {
    return <>{`Valeur pour ${iteration + 1}`}</>
  }
  if ( !title ) {
    return <>{`Valeurs renseignés :`}</>
  } 
  if ( (!iteration && iteration !== 0) && title ) {
    return <>{(executeExpression(title, { iteration: undefined }) as ReactNode)}</>
  }
  return <>{(executeExpression(title, { iteration }) as ReactNode)}</>
}

export function LunaticSummary(props: LunaticComponentProps<'Summary'>) {
	const { executeExpression, label, sections } = props;

  const compiledSections = sections.reduce((acc, section) => {
    const { iterations, title, responses } = section;
    if (iterations) {
      const compiledIterations: number = executeExpression(iterations)
      if (responses) {
        const elements = Array(compiledIterations)
        .fill(null)
        .map(function (_, iteration) {
          return {
            values: compileResponses(responses, executeExpression, iteration), 
            title: <CompiledTitle executeExpression={executeExpression} iteration={iteration} title={title} />
          }
        })
        return [...acc, ...elements]
      }
    }
    if (responses) {
      const element = {
        title: <CompiledTitle executeExpression={executeExpression} iteration={undefined} title={title} />, 
        values: compileResponses(responses, executeExpression, undefined)
      }
      return [...acc, element]
    }
    return acc;
  }, [] as Array<{title?: ReactNode; values?: Array<{label: ReactNode, value: ReactNode}>}>)

	return (
		<SummaryContainer>
			<SummaryTitle label={label} />
      <SummaryResponses sections={compiledSections} />
		</SummaryContainer>
	);
}
