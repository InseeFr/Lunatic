import {
	type CSSProperties,
	type PropsWithChildren,
	type ReactNode,
} from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';
import { LabelDescription } from '../LabelDescription';

type Props = PropsWithChildren<{
	id?: string;
	htmlFor?: string;
	className?: string;
	style?: CSSProperties;
	// Secondary ext displayed under the label
	description?: ReactNode;
}>;

/**
 * Label displayed on top of a field
 */
function LunaticLabel({
	children,
	id,
	htmlFor,
	className,
	style,
	description,
}: Props) {
	if (!children) {
		return null;
	}
	return (
		<label
			htmlFor={htmlFor}
			id={id}
			className={classnames('lunatic-label', className)}
			style={style}
		>
			{children}
			<LabelDescription value={description} />
		</label>
	);
}

export const Label = slottableComponent('Label', LunaticLabel);
