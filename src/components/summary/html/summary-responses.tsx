import { PropsWithChildren, ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';

type ResponsesValue = Array<{
  label: ReactNode;
  value: ReactNode;
}>

function ListResponses({title, index, children}: PropsWithChildren<{title: ReactNode; index: number;}>) {
  return (
    <div key={index} className="lunatic-summary-responses-iteration">
      {title}
      <ul>{children}</ul>
    </div>
  )
}

function Responses({values}: {values?: ResponsesValue;}) {
  if (!values) {
    return null;
  }
  return <>
    {values.map(({ label, value }, index) => {
      return (
        <li key={index}>
          {label} : {value}
        </li>
      );
    })}
  </>
}



function SummaryResponses({sections}: {
  sections: Array<{
    title?: ReactNode;
    values?: ResponsesValue;
  }>}) {

    const visibleSections = sections.filter(s => s)
  return (
    <>
      {visibleSections.map((section, index) => {
          const { title, values } = section
          return <ListResponses index={index} key={index} title={title}>
            <Responses values={values} />
          </ListResponses>
        })}
    </>
  )
}

export default createCustomizableLunaticField(SummaryResponses, 'SummaryResponses');
