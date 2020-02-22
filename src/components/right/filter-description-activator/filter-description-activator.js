import React from 'react';
import PropTypes from 'prop-types';
import './filter-description-activator.scss';

const FilterDescriptionActivator = ({ value, onChange }) => (
  <div className="filter-description-activator">
    <input id="filter-description-activator" type="checkbox" checked={value} onChange={onChange} />
    <label htmlFor="filter-description-activator">{`Display filter description`}</label>
  </div>
);

export default FilterDescriptionActivator;

FilterDescriptionActivator.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
