import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Activator from './activator';
import Orchestrator from './orchestrator';

const Questionnaire = ({ source, data, error }) => {
  const [vtl, setVtl] = useState(true);
  const [filter, setFilter] = useState(false);

  if (error) return <h2 className="error">{error}</h2>;
  if (!Array.isArray(source.components)) return <h2 className="error">Missing components</h2>;

  return (
    <div className="container">
      <Activator
        id="vtl"
        label={`VTL interpretation (labels & filters)`}
        value={vtl}
        onChange={() => {
          setVtl(!vtl);
        }}
      />
      <Activator
        id="filter-decsription"
        label={`Display filter description`}
        value={filter}
        onChange={() => {
          setFilter(!filter);
        }}
      />
      <h1 className="title">{source.label}</h1>
      <Orchestrator source={source} data={data} features={vtl ? ['VTL'] : []} filter={filter} />
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
