import React from 'react';
import PropTypes from 'prop-types';
import { LunaticField, useOnHandleChange } from '../commons';

import Dropdown from './dropdown';

function LunaticDropdown({
	label,
	declarations,
	id,
	handleChange,
	response,
	value,
	options,
	writable,
	disabled,
}) {
	const htmlFor = `lunatic-dropdown-${id}`;
	const labelId = `lunatic-dropdown-label-${id}`;

	const onSelect = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticField
			label={label}
			contentId={htmlFor}
			labelId={labelId}
			declarations={declarations}
			id={id}
			value={value}
			className="lunatic-dropdown"
		>
			<Dropdown
				id={id}
				htmlFor={htmlFor}
				labelId={labelId}
				writable={writable}
				disabled={disabled}
				options={options}
				editable={writable}
				onSelect={onSelect}
			/>
		</LunaticField>
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

export default React.memo(LunaticDropdown);
