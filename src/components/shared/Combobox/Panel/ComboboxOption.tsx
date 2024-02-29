import classnames from 'classnames';
import type { ComboboxOptionType } from '../ComboboxType';
import { slottableComponent } from '../../HOC/slottableComponent';

type Props = {
	option: ComboboxOptionType;
	selected?: boolean;
};

export const ComboboxOption = slottableComponent(
	'ComboboxOption',
	({ option, selected }: Props) => {
		const { id, value, label } = option;

		if (label && typeof label === 'string' && label.length) {
			return (
				<div className={classnames('lunatic-combo-box-option', { selected })}>
					<span className="id">{id || value}</span>
					<span> - </span>
					<span className="label">{label}</span>
				</div>
			);
		}
		return (
			<div className={classnames('lunatic-combo-box-option', { selected })}>
				<span className="id">{id}</span>
			</div>
		);
	}
);
