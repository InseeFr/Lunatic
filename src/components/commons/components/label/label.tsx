import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import classnames from 'classnames';
import createCustomizableLunaticField from '../../create-customizable-field';
import Description from '../description';
import './label.scss';
import { LunaticBaseProps } from '../../../type';

type Props = PropsWithChildren<{
	id?: string;
	htmlFor?: string;
	className?: string;
	style?: CSSProperties;
	description?:
		| ReactNode
		| Array<{ label: ReactNode; declarationType: string }>;
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
