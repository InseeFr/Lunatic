import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createCustomizableLunaticField, Label, Errors } from '../../commons';
import './switch.scss';

function Switch({
	checked,
	disabled,
	onClick,
	statusLabel,
	id,
	description,
	label,
	errors,
}) {
	const handleClick = useCallback(
		function () {
			onClick(!checked);
		},
		[checked, onClick]
	);

	const handleKeyDown = useCallback(
		function (e) {
			const { code } = e;
			if (code === 'Space') {
				onClick();
			}
		},
		[onClick]
	);
	const { true: labelTrue, false: labelFalse } = statusLabel;
	const labelId = `lunatic-switch-label-${id}`;
	return (
		<>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<div className="lunatic-switch" id={id}>
				<div
					className={classnames('lunatic-switch-label', { checked: !checked })}
				>
					{labelFalse}
				</div>
				<div
					role="switch"
					aria-checked={checked}
					tabIndex="0"
					className={classnames('lunatic-switch-container', {
						disabled,
						checked,
					})}
					onClick={handleClick}
					onKeyDown={handleKeyDown}
					aria-labelledby={labelId}
				>
					<div className="lunatic-switch-button"></div>
				</div>
				<div className={classnames('lunatic-switch-label', { checked })}>
					{labelTrue}
				</div>
			</div>
			<Errors errors={errors} activeId={id} />
		</>
	);
}

Switch.propTypes = {
	checked: PropTypes.bool.isRequired,
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	statusLabel: PropTypes.shape({
		true: PropTypes.string,
		false: PropTypes.string,
	}),
};

Switch.defaultProps = {
	disabled: false,
	statusLabel: {
		true: 'True',
		false: 'False',
	},
};

export default createCustomizableLunaticField(Switch, 'Switch');
