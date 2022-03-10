import React from 'react';
import PropTypes from 'prop-types';

import { LunaticField, useOnHandleChange } from '../commons';
import Switch from './switch';

function LunaticSwitch({
	label,
	declarations,
	id,
	handleChange,
	response,
	value,
	statusLabel,
}) {
	const inputId = `lunatic-switch-${id}`;
	const labelId = `lunatic-switch-label-${id}`;
	const booleanValue = value === true ? value : false;

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
			<Switch
				checked={booleanValue}
				handleChange={onClick}
				statusLabel={statusLabel}
				labelId={labelId}
			/>
		</LunaticField>
	);
}

LunaticSwitch.propTypes = {
	value: PropTypes.oneOf([null, true, false]),
};

LunaticSwitch.defaultProps = { statusLabel: { true: 'True', false: 'False' } };

export default LunaticSwitch;
