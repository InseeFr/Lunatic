import LabelSelection, { LabelSelectionProps } from './label-selection';
import Input, { InputProps } from './input';

type LabelOrInputTypeProps = LabelSelectionProps &
	InputProps & { editable?: boolean; expanded?: boolean };

/**
 * Affiche l'input ou le libellé de la selection selon l'état du suggester.
 * Lorsque le composant n'est pas focus, une représentation de la recherche active
 * est présenté plutôt que le champ input. Ce dernier est liè à la recherche de l'utilisateur
 * (les lettres saisies), non directement à l'option choisi parmi les suggestions.
 * Utiliser directement le champ input pour représenter la selection entre en conflit avec les inter-action de recherche
 * de l'utilisateur.
 * @param props
 * @returns
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
			focused={focused}
		/>
	);
}
