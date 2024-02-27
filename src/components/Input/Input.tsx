import classnames from 'classnames';
import { type ChangeEventHandler } from 'react';
import './Input.scss';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { Declarations } from '../shared/Declarations/Declarations';

function LunaticInput({
	value,
	handleChange,
	response,
	disabled,
	required,
	maxLength,
	label,
	description,
	id,
	errors,
	readOnly,
	declarations,
}: LunaticComponentProps<'Input'>) {
	const labelId = `label-${id}`;

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		handleChange(response, e.target.value);
	};
	return (
		<div className={classnames('lunatic-input')}>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			<input
				id={id}
				aria-labelledby={labelId}
				autoComplete="off"
				type="text"
				disabled={disabled}
				readOnly={readOnly}
				value={(value ?? '').toString()}
				onChange={onChange}
				aria-required={required}
				required={required}
				maxLength={maxLength}
				aria-invalid={!!errors}
			/>
			<ComponentErrors errors={errors} componentId={id} />
		</div>
	);
}

export const Input = customizedComponent('Input', LunaticInput);
