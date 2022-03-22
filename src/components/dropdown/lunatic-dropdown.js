import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
	LunaticField,
	useOnHandleChange,
	Dropdown as DropdownHtml,
} from '../commons';

const OPTIONS = [
	{ label: 'toto', id: 'toto' },
	{ label: 'lulu', id: 'lulu' },
];

function Dropdown({ label, declarations, id, handleChange, response, value }) {
	const inputId = `lunatic-dropdown-${id}`;
	const labelId = `lunatic-dropdown-label-${id}`;

	const onClick = useOnHandleChange({ handleChange, response, value });

	const onChange = useCallback(function (...args) {
		console.log('onChange', args);
	}, []);
	console.log({ response, value });
	return (
		<LunaticField
			label={label}
			contentId={inputId}
			labelId={labelId}
			declarations={declarations}
			id={id}
			value={value}
			className="lunatic-dropdown"
		>
			<DropdownHtml
				onChange={onChange}
				disabled={false}
				options={OPTIONS}
				editable={false}
				onClickOption={onClick}
			/>
		</LunaticField>
	);
}

Dropdown.propTypes = {};

Dropdown.defaultProps = {};

export default React.memo(Dropdown);
