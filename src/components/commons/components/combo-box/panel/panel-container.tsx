import classnames from 'classnames';
import { type PropsWithChildren } from 'react';
import { customizedComponent } from '../../../../shared/HOC/customizedComponent';

type Props = PropsWithChildren<{
	focused?: boolean;
	expanded?: boolean;
	id?: string;
}>;

function PanelContainer({ children, focused, expanded, id }: Props) {
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

export default customizedComponent('ComboboxPanelContainer', PanelContainer);
