import classnames from 'classnames';
import { type PropsWithChildren } from 'react';
import { customizedComponent } from '../../HOC/customizedComponent';

type Props = PropsWithChildren<{
	focused?: boolean;
	expanded?: boolean;
	id?: string;
}>;

export const ComboboxPanelContainer = customizedComponent(
	'ComboboxPanelContainer',
	({ children, focused, expanded, id }: Props) => (
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
	)
);
