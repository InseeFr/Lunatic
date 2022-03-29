import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import {
	ComboBox,
	DefaultOptionRenderer,
	DefaultLabelRenderer,
	createCustomizableLunaticField,
} from '../commons';
import './default-style.scss';

function getSearch(search, value) {
	if (!search.length) {
		if (value) {
			return value;
		}
	}

	return '';
}

function Suggester({
	className,
	labelledBy,
	placeholder,
	onSelect,
	labelRenderer,
	optionRenderer,
	value,
	custom,
	disabled,
	id,
	options,
	onChange,
}) {
	const htmlFor = `lunatic-suggester-${id}`;
	const [search, setSearch] = useState('');

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
		function (search) {
			onChange(search);
			setSearch(search);
		},
		[onChange]
	);

	const defaultSearch = getSearch(search, value);

	return (
		<ComboBox
			id={id}
			htmlFor={htmlFor}
			className={className}
			labelledBy={labelledBy}
			onChange={handleChange}
			disabled={disabled}
			options={options}
			editable={true}
			onSelect={handleSelect}
			value={value}
			search={defaultSearch}
			custom={custom}
			optionRenderer={optionRenderer}
			labelRenderer={labelRenderer}
			placeholder={placeholder}
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

export default createCustomizableLunaticField(Suggester);
