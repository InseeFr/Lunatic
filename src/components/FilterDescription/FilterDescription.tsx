import { slottableComponent } from '../shared/HOC/slottableComponent';
import { LunaticComponentProps } from '../type';

type Props = LunaticComponentProps<'FilterDescription'>;

export function FilterDescription({
	id,
	label,
}: LunaticComponentProps<'FilterDescription'>) {
	return <CustomFilterDescription id={id} label={label} />;
}

export const CustomFilterDescription = slottableComponent<Props>(
	'FilterDescription',
	(props) => {
		const { id, label } = props;

		return (
			<div
				id={`filter-description-${id}`}
				aria-label={`filter-description`}
				className="filter-description-lunatic"
			>
				{label}
			</div>
		);
	}
);
