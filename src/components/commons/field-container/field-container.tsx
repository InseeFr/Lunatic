import classnames from 'classnames';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	management?: boolean;
}>;

export function FieldContainer({ children, management }: Props) {
	return (
		<div className="field-container">
			<div
				className={classnames({
					'field-with-tooltip': management,
					field: !management,
				})}
			>
				{children}
			</div>
			{management && <div className="tooltip" />}
		</div>
	);
}
