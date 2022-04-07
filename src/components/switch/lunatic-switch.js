import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Switch from './switch';

import { createLunaticComponent } from '../commons';

function LunaticSwitch({ id, value, statusLabel, onChange, custom, labelId }) {
	const booleanValue = value || false;
	const onClick = useCallback(
		function (status) {
			onChange(status);
		},
		[onChange]
	);

	return (
		<Switch
			id={id}
			checked={booleanValue}
			onClick={onClick}
			statusLabel={statusLabel}
			labelId={labelId}
			custom={custom}
		/>
	);
}

LunaticSwitch.propTypes = {
	value: PropTypes.oneOf([null, true, false]),
};

LunaticSwitch.defaultProps = { statusLabel: { true: 'True', false: 'False' } };

export default createLunaticComponent(LunaticSwitch, {
	inputId: 'lunatic-switch',
});
