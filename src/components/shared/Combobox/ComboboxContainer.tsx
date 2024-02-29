import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { customizedComponent } from '../HOC/customizedComponent';
import type { LunaticError } from '../../../use-lunatic/type';
import { ComponentErrors } from '../ComponentErrors/ComponentErrors';

type Props = PropsWithChildren<{
	classNamePrefix?: string;
	className?: string;
	id?: string;
	classStyle?: string;
	errors?: LunaticError[];
}>;

export const ComboboxContainer = customizedComponent<Props>(
	'ComboboxContainer',
	({
		children,
		className,
		classNamePrefix,
		id,
		classStyle = 'default-style',
		errors,
	}) => (
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
			{errors && <ComponentErrors errors={errors} />}
		</div>
	)
);
