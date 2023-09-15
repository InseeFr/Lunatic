import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import type { LunaticBaseProps } from '../../../type';
import createCustomizableLunaticField from '../../create-customizable-field';
import Errors from '../errors';

type Props = PropsWithChildren<{
	classNamePrefix?: string;
	className?: string;
	id?: string;
	classStyle?: string;
	errors?: LunaticBaseProps['errors'];
}>;

function ComboBoxContainer({
	children,
	className,
	classNamePrefix,
	id,
	classStyle = 'default-style',
	errors,
}: Props) {
	return (
		<div
			id={`${classNamePrefix ?? 'lunatic'}-combo-box-container-${id}`}
			className={classnames(
				className,
				`${classNamePrefix ?? 'lunatic'}-combo-box-container`,
				`${classNamePrefix ?? 'lunatic'}-suggester-${classStyle}`,
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
