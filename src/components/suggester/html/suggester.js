import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
	ComboBox,
	DefaultOptionRenderer,
	DefaultLabelRenderer,
	createCustomizableLunaticField,
} from '../../commons';
import './default-style.scss';

function getSearch(search, value) {
	if (!search.length && value) {
		return value;
	}

	return '';
}

function Suggester({
	className,
	placeholder,
	onSelect,
	labelRenderer,
	optionRenderer,
	value,
	disabled,
	id,
	searching,
	label,
	description,
	errors,
}) {
	const htmlFor = `lunatic-suggester-${id}`;
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState([]);

	const handleSelect = useCallback(
		function (id) {
			if (id) {
				onSelect(id);
			} else {
				onSelect(null);
			}
		},
		[onSelect]
	);

	const handleChange = useCallback(
		async function (search) {
			if (search && typeof searching === 'function') {
				const { results, search: old } = await searching(search);
				setOptions(results);
				setSearch(search);
			} else {
				setOptions([]);
				onSelect(null);
				setSearch('');
			}
		},
		[searching, onSelect]
	);

	const defaultSearch = getSearch(search, value);

	return (
		<ComboBox
			id={id}
			htmlFor={htmlFor}
			className={className}
			onChange={handleChange}
			disabled={disabled}
			options={options}
			editable={true}
			onSelect={handleSelect}
			value={value}
			search={defaultSearch}
			optionRenderer={optionRenderer}
			labelRenderer={labelRenderer}
			placeholder={placeholder}
			label={label}
			description={description}
			errors={errors}
		/>
	);
}

Suggester.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.elementType,
	labelRenderer: PropTypes.elementType,
	onSelect: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.object,
	]),
	searching: PropTypes.func,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.object,
};

Suggester.defaultProps = {
	className: 'lunatic-suggester-default-style',
	labelledBy: undefined,
	placeholder: 'Veuillez...',
	optionRenderer: DefaultOptionRenderer,
	labelRenderer: DefaultLabelRenderer,
	language: 'French',
	onSelect: () => null,
	value: undefined,
	searching: undefined,
};

export default createCustomizableLunaticField(Suggester, 'Suggester');
