import React from 'react';
import PropTypes from 'prop-types';
import { LunaticField, useOnHandleChange } from '../commons';
import Textarea from './textarea';

function LunaticTextarea({
	label,
	declarations,
	id,
	handleChange,
	response,
	value,
	custom,
}) {
	const inputId = `lunatic-textarea-${id}`;
	const labelId = `lunatic-textarea-label-${id}`;

	const onClick = useOnHandleChange({ handleChange, response, value });
	return (
		<LunaticField
			label={label}
			contentId={inputId}
			labelId={labelId}
			declarations={declarations}
			id={id}
			value={value}
			className="lunatic-switch"
		>
			<Textarea onClick={onClick} custom={custom} />
		</LunaticField>
	);
}

export default LunaticTextarea;
