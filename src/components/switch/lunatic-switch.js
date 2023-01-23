import React from 'react';
import PropTypes from 'prop-types';
import Switch from './html/switch';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';

function LunaticSwitch({
	id,
	value,
	statusLabel,
	labelId,
	handleChange,
	response,
	preferences,
	declarations,
	missing,
	missingResponse,
	management,
	description,
	label,
	errors,
}) {
	const booleanValue = value || false;

	const onClick = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
		>
			<Switch
				id={id}
				checked={booleanValue}
				onClick={onClick}
				statusLabel={statusLabel}
				labelId={labelId}
				label={label}
				errors={errors}
			/>
		</LunaticComponent>
	);
}

LunaticSwitch.propTypes = {
	value: PropTypes.oneOf([null, true, false]),
};

LunaticSwitch.defaultProps = { statusLabel: { true: 'True', false: 'False' } };

export default LunaticSwitch;
