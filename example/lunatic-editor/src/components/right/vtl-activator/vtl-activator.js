import React from 'react';
import PropTypes from 'prop-types';
import './vtl-activator.scss';

const VtlActivator = ({ value, onChange }) => (
  <div className="vtl-activator">
    <input id="vtl-activator" type="checkbox" checked={value} onChange={onChange} />
    <label htmlFor="vtl-activator">VTL interpretation</label>
  </div>
);

export default VtlActivator;

VtlActivator.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
