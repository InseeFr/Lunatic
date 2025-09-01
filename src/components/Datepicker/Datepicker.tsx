import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { Declarations } from '../shared/Declarations/Declarations';
import type { LunaticError } from '../../use-lunatic/type';
import { CustomDatepickerFields } from './DatepickerFields';

export function Datepicker({
	dateFormat = 'YYYY-MM-DD',
	response,
	handleChanges,
	errors,
	...props
}: LunaticComponentProps<'Datepicker'>) {
	const { id, iteration } = props;
	// We can have the same id (same variable) for different iterations in successive pages, we need to have unique key for remount correctly
	const datepickerFieldsKey = `${id}-${iteration}`;

	return (
		<CustomDatepicker
			{...props}
			key={datepickerFieldsKey}
			dateFormat={dateFormat ?? 'YYYY-MM-DD'}
			onChange={(value) => handleChanges([{ name: response.name, value }])}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Datepicker'>,
	'response' | 'handleChanges' | 'errors'
> & {
	onChange: (s: string | null) => void;
	errors?: LunaticError[];
};

export const CustomDatepicker = slottableComponent<CustomProps>(
	'Datepicker',
	(props) => {
		const { id, label, errors, description, declarations } = props;

		const labelId = `lunatic-datepicker-${id}`;

		return (
			<div className="lunatic-input">
				<Label htmlFor={id} id={labelId} description={description}>
					{label}
				</Label>
				<Declarations
					type="AFTER_QUESTION_TEXT"
					declarations={declarations}
					id={id}
				/>
				<CustomDatepickerFields {...props} />
				<ComponentErrors errors={errors} />
			</div>
		);
	}
);
