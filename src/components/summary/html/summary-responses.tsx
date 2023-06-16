import { PropsWithChildren, ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';

function ListResponses({title, children}: PropsWithChildren<{title: ReactNode}>) {
  return (
    <div className="lunatic-summary-responses-iteration">
      {title}
      <ul>{children}</ul>
    </div>
  )
}

function Responses({values}: {values?: Array<{
  label: ReactNode;
  value: ReactNode;
}>}) {
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
    values?: Array<{label: ReactNode, value: ReactNode }>
  }>}) {
  return (
    <>
      {
        sections.map((section) => {
          if (section) {
            const { title, values } = section
            return <ListResponses title={title}>
              <Responses values={values} />
             </ListResponses>
          }
          return null; 
        }) 

      }
    </>
  )
}

export default createCustomizableLunaticField(SummaryResponses, 'SummaryResponses');
