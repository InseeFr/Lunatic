import classnames from 'classnames';
import { type PropsWithChildren } from 'react';
import { slottableComponent } from '../../HOC/slottableComponent';

type Props = PropsWithChildren<{
	focused?: boolean;
	expanded?: boolean;
	id?: string;
}>;

export const ComboboxPanelContainer = slottableComponent(
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
