import classNames from 'classnames';
import type { ChangeEventHandler } from 'react';

type Props = {
	id: string;
	label: string;
	description: string;
	max?: number;
	onChange: (value: number) => void;
	value?: number;
	readOnly?: boolean;
	disabled?: boolean;
};

export function DatepickerField({
	label,
	id,
	description,
	onChange,
	value,
	max,
	readOnly,
	disabled,
}: Props) {
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (
			!Number.isNaN(e.target.valueAsNumber) &&
			((max && e.target.valueAsNumber > max) || e.target.valueAsNumber < 1)
		) {
			return;
		}
		onChange(e.target.valueAsNumber);
	};
	return (
		<div
			className={classNames(
				'lunaticDatepickerField',
				!max && 'lunaticDatepickerFieldLarge'
			)}
		>
			<label htmlFor={id}>
				{label}
				<span className="lunaticDatepickerHint">{description}</span>
			</label>
			<input
				id={id}
				type="number"
				min={1}
				max={max}
				readOnly={readOnly}
				disabled={disabled}
				value={Number.isNaN(value) ? '' : value}
				onChange={handleChange}
				onFocus={(e) => e.target.select()}
			/>
		</div>
	);
}
