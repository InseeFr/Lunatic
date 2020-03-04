import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './dropdown';
import DropdownEdit from './dropdown-edit';

function DropdownEx({
	writable,
	options,
	label,
	className,
	zIndex,
	disabled,
	value,
	handleChange,
}) {
	return writable ? (
		<DropdownEdit
			disabled={disabled}
			options={options}
			label={label}
			className={className}
			value={value}
			onSelect={handleChange}
		/>
	) : (
		<Dropdown
			disabled={disabled}
			options={options}
			label={label}
			className={className}
			zIndex={zIndex}
			value={value}
			onSelect={handleChange}
		/>
	);
}

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
	handleChange: PropTypes.func,
};

DropdownEx.defaultProps = {
	value: undefined,
	writable: false,
	handleChange: () => null,
	label: undefined,
	className: undefined,
	zIndex: 0,
	disabled: false,
	handleChange: () => null,
};

export default DropdownEx;
