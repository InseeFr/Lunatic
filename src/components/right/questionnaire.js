import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as lunatic from '@inseefr/lunatic';
import Activator from './activator';
import './custom-lunatic.scss';

const Questionnaire = ({ source, data, error }) => {
  const [questionnaire, setQuestionnaire] = useState(lunatic.mergeQuestionnaireAndData(source)({}));
  const [vtl, setVtl] = useState(true);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    setQuestionnaire(lunatic.mergeQuestionnaireAndData(source)(data));
  }, [source, data]);

  if (error) return <h2 className="error">{error}</h2>;
  if (!Array.isArray(questionnaire.components))
    return <h2 className="error">Missing components</h2>;

  const preferences = ['COLLECTED'];

  const onChange = updatedValue => {
    setQuestionnaire(
      lunatic.updateQuestionnaire('COLLECTED')(questionnaire)(preferences)(updatedValue)
    );
  };

  const bindings = lunatic.getBindings(questionnaire);
  const labelBindings = lunatic.getLabelBindings(questionnaire);

  const components = questionnaire.components
    .filter(({ conditionFilter }) =>
      vtl ? lunatic.interpret(['VTL'])(bindings)(conditionFilter) === 'normal' : true
    )
    .map(q => {
      const { id, componentType } = q;
      const Component = lunatic[componentType];
      if (!Component)
        return <h4 key={`component-${id}`}>{`${id} component type is not supported`}</h4>;
      return (
        <div className="lunatic lunatic-component" key={`component-${id}`}>
          <Component
            {...q}
            handleChange={onChange}
            labelPosition="TOP"
            preferences={preferences}
            features={vtl ? ['VTL'] : []}
            bindings={vtl ? labelBindings : {}}
            writable
            zIndex={1}
            filterDescription={filter}
          />
        </div>
      );
    });
  return (
    <div className="container">
      <Activator
        id="vtl"
        label={`VTL interpretation (labels & filters)`}
        value={vtl}
        onChange={() => setVtl(!vtl)}
      />
      <Activator
        id="filter-decsription"
        label={`Display filter description`}
        value={filter}
        onChange={() => setFilter(!filter)}
      />
      <h1 className="title">{questionnaire.label}</h1>
      <div className="components">{components}</div>
    </div>
  );
};

export default Questionnaire;

Questionnaire.defaultProps = {
  data: {},
  error: '',
};

Questionnaire.propTypes = {
  source: PropTypes.shape({
    label: PropTypes.string,
    components: PropTypes.array,
    variables: PropTypes.array,
  }).isRequired,
  data: PropTypes.shape({
    COLLECTED: PropTypes.objectOf(PropTypes.string),
    CALCULATED: PropTypes.objectOf(PropTypes.string),
    EXTERNAL: PropTypes.objectOf(PropTypes.string),
  }),
  error: PropTypes.string,
};
