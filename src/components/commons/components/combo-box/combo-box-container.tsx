import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import createCustomizableLunaticField from '../../create-customizable-field';
import Errors from '../errors';
import type { LunaticError } from '../../../../use-lunatic/type';

type Props = PropsWithChildren<{
	classNamePrefix?: string;
	className?: string;
	id?: string;
	classStyle?: string;
	errors?: LunaticError[];
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
			{errors && <Errors errors={errors} />}
		</div>
	);
}

export default createCustomizableLunaticField(
	ComboBoxContainer,
	'ComboboxContainer'
);
