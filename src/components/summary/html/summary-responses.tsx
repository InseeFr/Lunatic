import { type PropsWithChildren, type ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';

type ResponsesValue = Array<{
  label: ReactNode;
  value: ReactNode;
}>

function ListResponses({ title, children }: PropsWithChildren<{ title: ReactNode }>) {
  return (
    <div className="lunatic-summary-responses-iteration">
      {title}
      <ul>{children}</ul>
    </div>
  )
}

function Responses({ values }: { values?: ResponsesValue; }) {
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



function SummaryResponses({ sections }: {
  sections: Array<{
    title?: ReactNode;
    values?: ResponsesValue;
  }>
}) {

  const visibleSections = sections.filter(s => s)
  return (
    <>
      {visibleSections.map((section, index) => {
        const { title, values } = section
        return <ListResponses key={index} title={title}>
          <Responses values={values} />
        </ListResponses>
      })}
    </>
  )
}

export default createCustomizableLunaticField(SummaryResponses, 'SummaryResponses');
