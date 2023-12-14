import classnames from 'classnames';
import { type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	expanded?: boolean;
	focused?: boolean;
	disabled?: boolean;
	labelId?: string;
	id?: string;
	classNamePrefix?: string;
}>;

function SelectionContainer({
	children,
	id = 'idUndefined',
	expanded,
	focused,
	disabled,
	labelId,
	classNamePrefix,
}: Props) {
	const comboBoxId = `${id}`;
	return (
		<div
			id={comboBoxId}
			className={classnames(
				`${classNamePrefix ?? 'lunatic'}-combo-box-selection`,
				{
					focused,
					disabled,
				}
			)}
		>
			{children}
		</div>
	);
}

export default SelectionContainer;
