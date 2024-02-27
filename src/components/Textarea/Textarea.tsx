import { type ChangeEventHandler } from 'react';
import './Textarea.scss';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { customizedComponent } from '../shared/HOC/customizedComponent';

function LunaticTextarea({
	id,
	rows,
	maxLength,
	cols,
	value,
	label,
	handleChange,
	response,
	description,
	errors,
	placeHolder,
	readOnly,
	required,
}: LunaticComponentProps<'Textarea'>) {
	const labelId = `label-${id}`;
	const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		handleChange(response, e.target.value);
	};

	return (
		<div className="lunatic-textarea">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<textarea
				required={required}
				id={id}
				rows={rows}
				maxLength={maxLength}
				cols={cols}
				onChange={onChange}
				value={value ?? ''}
				placeholder={placeHolder}
				readOnly={readOnly}
				aria-invalid={!!errors}
			/>
			<ComponentErrors errors={errors} componentId={id} />
		</div>
	);
}

export const Textarea = customizedComponent('Textarea', LunaticTextarea);
