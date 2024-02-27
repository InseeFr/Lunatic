import type { LunaticComponentProps } from '../type';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import React, { type KeyboardEvent } from 'react';
import classnames from 'classnames';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { Label } from '../shared/Label/Label';
import { Declarations } from '../shared/Declarations/Declarations';

const defaultLabel = { true: 'True', false: 'False' };

function LunaticSwitch({
	id,
	value,
	statusLabel = defaultLabel,
	handleChange,
	response,
	label,
	errors,
	disabled,
	declarations,
}: LunaticComponentProps<'Switch'>) {
	const checked = value ?? false;

	const handleClick = () => {
		handleChange(response, !checked);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const { code } = e;
		if (code === 'Space') {
			handleChange(response, !checked);
		}
	};
	const { true: labelTrue, false: labelFalse } = statusLabel;
	const labelId = `lunatic-switch-label-${id}`;
	return (
		<>
			<Label htmlFor={id} id={labelId}>
				{label}
			</Label>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			<div className="lunatic-switch" id={id}>
				<div
					className={classnames('lunatic-switch-label', { checked: !checked })}
				>
					{labelFalse}
				</div>
				<div
					role="switch"
					aria-checked={checked}
					aria-invalid={!!errors}
					tabIndex={0}
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
			<ComponentErrors errors={errors} componentId={id} />
		</>
	);
}

export const Switch = customizedComponent('Switch', LunaticSwitch);
