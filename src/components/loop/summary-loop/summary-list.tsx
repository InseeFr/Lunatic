import { LunaticComponentProps } from "../../type";
import Header from "./header";
import Body from "./body";

type Props = Pick<
	LunaticComponentProps<'SummaryLoop'>,
  'label'
	| 'id'
	| 'components'
	| 'executeExpression'
	| 'headers'
	| 'management'
	| 'missing'
	| 'shortcut'
	| 'errors'
  | 'iterations'
>;

function SummaryList({
  label, 
  id, 
  components, 
  management, 
  missing, 
  shortcut, 
  executeExpression,
  iterations
}: Props) {
  return (
      <>
        <Header id={id} label={label}/>
        <Body 
          id={id}
          components={components}
          management={management}
          missing={missing}
          shortcut={shortcut}
          executeExpression={executeExpression}
          iterations={iterations}
        />
      </>
    )
}

export default SummaryList;