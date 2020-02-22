import React from 'react';
import PropTypes from 'prop-types';
import './activator.scss';

const Activator = ({ value, onChange, label }) => (
  <div className="activator">
    <input id="activator" type="checkbox" checked={value} onChange={onChange} />
    <label htmlFor="activator">{label}</label>
  </div>
);

export default Activator;

Activator.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
