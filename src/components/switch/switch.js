import React, { useCallback } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../commons';
import './switch.scss';

function Switch({ checked, disabled, handleChange, statusLabel, labelId }) {
	const onClick = useCallback(
		function () {
			handleChange(!checked);
		},
		[checked]
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

	return (
		<div className="lunatic-switch">
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
				onClick={onClick}
				onKeyDown={handleKeyDown}
				labelledBy={labelId}
			>
				<div className="lunatic-switch-button"></div>
			</div>
			<div className={classnames('lunatic-switch-label', { checked })}>
				{labelTrue}
			</div>
		</div>
	);
}

export default createCustomizableLunaticField(Switch);
