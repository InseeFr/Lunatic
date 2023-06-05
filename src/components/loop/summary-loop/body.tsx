import { OrchestratedComponent } from '../../commons';
import { LunaticComponentProps } from '../../type';

type Props = Pick<
	LunaticComponentProps<'SummaryLoop'>,
	| 'id'
	| 'components'
	| 'executeExpression'
	| 'management'
	| 'missing'
	| 'shortcut'
	| 'errors'
  | 'iterations'
>;

function Body({
  id,
  components,
  management,
  missing,
  shortcut,
  executeExpression,
  iterations
}: Props) {

  let summaryIterations = [null]
  if (iterations) {
    summaryIterations = new Array(iterations).fill(null)
  }

  return <>
    {summaryIterations.map((_, iteration) => {
      return <>
        {components.map((component) => {
          const idComponent = component.id
          return (
            <OrchestratedComponent 
              component={component}
              handleChange={()=>{}}
              missing={missing}
              shortcut={shortcut}
              management={management}
              value={undefined}
              id={idComponent}
              key={idComponent}
              executeExpression={executeExpression}
              iteration={iteration}
            />
          )
        })}
      </>;
    })}
  </>;
}

export default Body;