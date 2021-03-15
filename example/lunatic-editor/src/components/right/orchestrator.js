import React from 'react';
import PropTypes from 'prop-types';
import * as lunatic from '@inseefr/lunatic';

const preferences = ['COLLECTED'];
const savingType = 'COLLECTED';
const management = false;
const features = ['VTL'];

const Questionnaire = ({ source, data, error }) => {
  const { questionnaire, components, handleChange, bindings } = lunatic.useLunatic(source, data, {
    savingType,
    preferences,
    features,
    management,
  });

  if (error) return <h2 className="error">{error}</h2>;
  if (!Array.isArray(questionnaire.components))
    return <h2 className="error">Missing components</h2>;

  const uiComponents = components.map((q) => {
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
          filterDesprition={false}
        />
      </div>
    );
  });

  return (
    <div className="container">
      <h1 className="title">{questionnaire.label}</h1>
      <div className="components">{uiComponents}</div>
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
