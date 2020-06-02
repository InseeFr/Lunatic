import React from 'react';
import PropTypes from 'prop-types';
import './activator.scss';

const Activator = ({ id, label, value, onChange }) => (
  <div className="activator">
    <input id={`activator-${id}`} type="checkbox" checked={value} onChange={onChange} disabled />
    <label htmlFor={`activator-${id}`}>{label}</label>
  </div>
);

export default Activator;

Activator.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
