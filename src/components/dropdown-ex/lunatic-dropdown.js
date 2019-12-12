import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './dropdown';
import DropdownEdit from './dropdown-edit';

const DropdownEx = ({ writable, options, label, className, zIndex }) => {
	return writable ? (
		<DropdownEdit
			options={options}
			label={label}
			className={className}
			zIndex={zIndex}
		/>
	) : (
		<Dropdown
			options={options}
			label={label}
			className={className}
			zIndex={zIndex}
		/>
	);
};

DropdownEx.propTypes = {
	writable: PropTypes.bool,
	handleChange: PropTypes.func,
	label: PropTypes.string,
	className: PropTypes.string,
	zIndex: PropTypes.number,
};

DropdownEx.defaultProps = {
	writable: false,
	handleChange: () => null,
	label: undefined,
	className: undefined,
	zIndex: 0,
};

export default DropdownEx;
