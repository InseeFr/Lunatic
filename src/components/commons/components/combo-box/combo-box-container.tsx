import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { LunaticBaseProps } from '../../../type';
import createCustomizableLunaticField from '../../create-customizable-field';
import Errors from '../errors';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
	classStyle?: string;
	errors?: LunaticBaseProps['errors'];
}>;

function ComboBoxContainer({
	children,
	className,
	id,
	classStyle = 'default-style',
	errors,
}: Props) {
	return (
		<div
			id={`${className ?? 'lunatic'}-combo-box-container-${id}`}
			className={classnames(
				`${className ?? 'lunatic'}-combo-box-container`,
				`${className ?? 'lunatic'}-suggester-${classStyle}`,
				`lunatic-suggester-default-style`,
				classStyle
			)}
		>
			{children}
			{/* Errors are called here so that they can be customised */}
			{errors && <Errors errors={errors} activeId={id} />}
		</div>
	);
}

export default createCustomizableLunaticField(
	ComboBoxContainer,
	'ComboboxContainer'
);
