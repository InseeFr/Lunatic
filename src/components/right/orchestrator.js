import React, { useEffect } from 'react';
import * as lunatic from '@inseefr/lunatic';
import './custom-lunatic.scss';

const preferences = ['COLLECTED'];
const savingType = 'COLLECTED';

const Orchestrator = ({ source, data, features, filter }) => {
  console.log(filter);
  const { questionnaire, components, handleChange, bindings } = lunatic.useLunatic(source, data, {
    savingType,
    preferences,
    features,
  });

  console.log(lunatic.getCollectedState(questionnaire));

  return (
    <div className="components">
      {components.map(q => {
        const { id, componentType } = q;
        const Component = lunatic[componentType];
        if (!Component)
          return <h4 key={`component-${id}`}>{`${id} component type is not supported`}</h4>;
        return (
          <div className="lunatic lunatic-component" key={`component-${id}`}>
            <Component
              {...q}
              handleChange={handleChange}
              labelPosition="TOP"
              preferences={preferences}
              features={features}
              bindings={bindings}
              writable
              zIndex={1}
              filterDescription={filter}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Orchestrator;
