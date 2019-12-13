import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './dropdown';
import DropdownEdit from './dropdown-edit';

const DropdownEx = ({
	writable,
	options,
	label,
	className,
	zIndex,
	disabled,
	value,
}) => {
	return writable ? (
		<DropdownEdit
			disabled={disabled}
			options={options}
			label={label}
			className={className}
			zIndex={zIndex}
			value={value}
		/>
	) : (
		<Dropdown
			disabled={disabled}
			options={options}
			label={label}
			className={className}
			zIndex={zIndex}
			value={value}
		/>
	);
};

DropdownEx.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string,
		PropTypes.number,
	]),
	disabled: PropTypes.bool,
	writable: PropTypes.bool,
	handleChange: PropTypes.func,
	label: PropTypes.string,
	className: PropTypes.string,
	zIndex: PropTypes.number,
};

DropdownEx.defaultProps = {
	value: undefined,
	writable: false,
	handleChange: () => null,
	label: undefined,
	className: undefined,
	zIndex: 0,
	disabled: false,
};

export default DropdownEx;
