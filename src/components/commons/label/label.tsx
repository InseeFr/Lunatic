import type { CSSProperties, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { Description } from '../description';
import './label.scss';
import { createCustomizableLunaticField } from '../../create-customizable-field';

type Props = PropsWithChildren<{
	id?: string;
	htmlFor?: string;
	className?: string;
	style?: CSSProperties;
	description?: string;
}>;

function Label({
	children,
	id,
	htmlFor,
	className,
	style,
	description,
}: Props) {
	if (children) {
		return (
			<label
				htmlFor={htmlFor}
				id={id}
				className={classnames('lunatic-label', className)}
				style={style}
			>
				{children}
				<Description value={description} />
			</label>
		);
	}
	return null;
}

export default createCustomizableLunaticField(Label, 'Label');
