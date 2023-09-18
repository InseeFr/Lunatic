import LabelSelection, { type LabelSelectionProps } from './label-selection';
import Input, { type InputProps } from './input';

type LabelOrInputTypeProps = LabelSelectionProps &
	InputProps & { editable?: boolean; expanded?: boolean; readOnly?: boolean };

/**
 * Display the input or the label of the selection based on the state of the Suggester.
 *
 * When the component is not focused, a representation of what is being searched
 * is presented instead of the Input. This is related to what the user searched
 * (i.e. the letters entered), not directly to the option chosen among the suggestions.
 * Using the input directly to represent the selection causes a conflict with that which the user enters in order to search.
 */
export function LabelOrInput(props: LabelOrInputTypeProps) {
	const { editable, expanded } = props;
	const displayLabel = !editable || !expanded;

	const {
		labelRenderer,
		placeholder,
		selectedIndex,
		options,
		search,
		disabled,
		readOnly,
		id,
		focused,
		onChange,
	} = props;

	if (displayLabel) {
		return (
			<LabelSelection
				labelRenderer={labelRenderer}
				placeholder={placeholder}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
				readOnly={readOnly}
			/>
		);
	}
	return (
		<Input
			id={`combobox-input-${id}`}
			className="lunatic-combo-box-input"
			onChange={onChange}
			value={search}
			placeholder={placeholder}
			disabled={disabled}
			readOnly={readOnly}
			focused={focused}
		/>
	);
}
