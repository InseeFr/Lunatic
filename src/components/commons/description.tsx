import classnames from 'classnames';
import { isElement } from '../../utils/is-element';

type Props = {
	value?: string | { label: unknown; declarationType: string }[];
	className?: string;
};

export function Description({ value, className }: Props) {
	if (!Array.isArray(value)) {
		return null;
	}
	return (
		<>
			{value.map(({ label, declarationType }, index) => (
				<OneDescription
					key={`description-${index}`}
					value={label}
					className={classnames(className, declarationType)}
				/>
			))}
		</>
	);
}

function OneDescription({
	value,
	className,
}: {
	value: unknown;
	className?: string;
}) {
	if ((typeof value === 'string' && value.length > 0) || isElement(value)) {
		return (
			<span className={classnames('label-description', className)}>
				{value}
			</span>
		);
	}

	return null;
}
