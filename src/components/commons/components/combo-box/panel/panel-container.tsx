import classnames from 'classnames';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	focused?: boolean;
	expanded?: boolean;
	id?: string;
}>;

export function PanelContainer({ children, focused, expanded, id }: Props) {
	return (
		<ul
			id={`lunatic-combo-box-panel-${id}`}
			aria-label="suggestions"
			className={classnames('lunatic-combo-box-panel', {
				focused,
				expanded,
			})}
			role="listbox"
		>
			{children}
		</ul>
	);
}
