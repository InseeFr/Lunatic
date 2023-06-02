import classnames from 'classnames';
import { SuggesterOption } from '../../type';

type Props = {
	option: SuggesterOption;
	selected?: boolean;
};

function DefaultOptionRenderer({ option, selected }: Props) {
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

export default DefaultOptionRenderer;
