import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
	LunaticField,
	useOnHandleChange,
	ComboBox,
	DefaultOptionRenderer,
	DefaultLabelRenderer,
} from '../commons';

const OPTIONS = [
	{ label: 'toto', id: 'toto' },
	{ label: 'lulu', id: 'lulu' },
];

function Dropdown({
	label,
	declarations,
	id,
	handleChange,
	response,
	value,
	optionRenderer,
	labelRenderer,
}) {
	const htmlFor = `lunatic-dropdown-${id}`;
	const labelId = `lunatic-dropdown-label-${id}`;

	const onSelect = useOnHandleChange({ handleChange, response, value });

	const onChange = useCallback(function (...args) {
		console.log('onChange', args);
	}, []);

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
			<ComboBox
				id={id}
				htmlFor={htmlFor}
				labelledBy={labelId}
				onChange={onChange}
				disabled={false}
				options={OPTIONS}
				editable={true}
				onSelect={onSelect}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
			/>
		</LunaticField>
	);
}

Dropdown.propTypes = {
	optionRenderer: PropTypes.elementType,
	labelRenderer: PropTypes.elementType,
};

Dropdown.defaultProps = {
	optionRenderer: DefaultOptionRenderer,
	labelRenderer: DefaultLabelRenderer,
};

export default React.memo(Dropdown);
