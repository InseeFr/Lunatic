import { type KeyboardEvent, type ReactNode } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField, Errors, Label } from '../../commons';
import './switch.scss';
import type { LunaticError } from '../../../use-lunatic/type';

type Props = {
	checked?: boolean;
	disabled?: boolean;
	statusLabel: { true: ReactNode; false: ReactNode };
	onClick: (v: boolean) => void;
	id: string;
	label: ReactNode;
	errors?: LunaticError[];
};

function Switch({
	checked,
	disabled,
	onClick,
	statusLabel,
	id,
	label,
	errors,
}: Props) {
	const handleClick = () => {
		onClick(!checked);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const { code } = e;
		if (code === 'Space') {
			onClick(!checked);
		}
	};
	const { true: labelTrue, false: labelFalse } = statusLabel;
	const labelId = `lunatic-switch-label-${id}`;
	return (
		<>
			<Label htmlFor={id} id={labelId}>
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
			<Errors errors={errors} />
		</>
	);
}

export default createCustomizableLunaticField(Switch, 'Switch');
