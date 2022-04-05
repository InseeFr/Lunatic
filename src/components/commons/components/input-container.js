import React from 'react';
import LunaticField from './lunatic-field';

function InputContainer({
	declarations,
	label,
	id,
	value,
	inputId,
	labelId,
	children,
	labelClassName,
	preferences,
}) {
	return (
		<LunaticField
			label={label}
			labelClassName={labelClassName}
			contentId={inputId}
			labelId={labelId}
			declarations={declarations}
			id={id}
			value={value}
			className={labelClassName}
			preferences={preferences}
		>
			{children}
		</LunaticField>
	);
}

export default InputContainer;
