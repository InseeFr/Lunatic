import type { LunaticComponentProps } from '../type';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import React, { type KeyboardEvent } from 'react';
import classnames from 'classnames';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { Label } from '../shared/Label/Label';
import { Declarations } from '../shared/Declarations/Declarations';
import type { LunaticError } from '../../use-lunatic/type';

const defaultLabel = { true: 'True', false: 'False' };

function LunaticSwitch({
	handleChange,
	response,
	errors,
	value,
	statusLabel,
	...props
}: LunaticComponentProps<'Switch'>) {
	const checked = value ?? false;
	return (
		<CustomSwitch
			{...props}
			statusLabel={statusLabel ?? defaultLabel}
			checked={value ?? false}
			onChange={() => handleChange(response, !checked)}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Switch'>,
	'response' | 'handleChange' | 'errors' | 'value'
> & {
	onChange: () => void;
	errors?: LunaticError[];
	checked: boolean;
};

export const CustomSwitch = customizedComponent<CustomProps>(
	'Switch',
	(props) => {
		const {
			id,
			onChange,
			checked,
			statusLabel = defaultLabel,
			label,
			errors,
			disabled,
			declarations,
		} = props;
		const { true: labelTrue, false: labelFalse } = statusLabel;
		const labelId = `lunatic-switch-label-${id}`;
		const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
			const { code } = e;
			if (code === 'Space') {
				onChange();
			}
		};
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
						className={classnames('lunatic-switch-label', {
							checked: !checked,
						})}
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
						onClick={onChange}
						onKeyDown={handleKeyDown}
						aria-labelledby={labelId}
					>
						<div className="lunatic-switch-button"></div>
					</div>
					<div className={classnames('lunatic-switch-label', { checked })}>
						{labelTrue}
					</div>
				</div>
				<ComponentErrors errors={errors} />
			</>
		);
	}
);

export const Switch = customizedComponent('Switch', LunaticSwitch);
