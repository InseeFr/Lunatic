import classnames from 'classnames';
import type { ComboboxOptionType } from '../../shared/Combobox/ComboboxType';

type Props = {
	option: ComboboxOptionType;
	selected?: boolean;
};

export function SimpleOptionRenderer({ option, selected }: Props) {
	const { value, label } = option;

	const content = label && typeof label === 'string' && label.length ? label : value;

	return (
		<div className={classnames('lunatic-dropdown-option', { selected })}>
			<span className="label">{content}</span>
		</div>
	);
}
