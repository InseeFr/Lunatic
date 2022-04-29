import React from 'react';
import PropTypes from 'prop-types';
import { createLunaticComponent } from '../commons';
import Dropdown from './dropdown';

function LunaticDropdown({
	id,
	onChange,
	options,
	writable,
	disabled,
	htmlFor,
	labelId,
	value,
}) {
	return (
		<Dropdown
			id={id}
			htmlFor={htmlFor}
			labelId={labelId}
			writable={writable}
			disabled={disabled}
			options={options}
			editable={writable}
			onSelect={onChange}
			value={value}
			className="lunatic-dropdown"
		/>
	);
}

LunaticDropdown.propTypes = {
	id: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
		})
	).isRequired,
	disabled: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.array,
	]),
};

LunaticDropdown.defaultProps = {
	disabled: false,
	value: null,
};

export default createLunaticComponent(LunaticDropdown);
