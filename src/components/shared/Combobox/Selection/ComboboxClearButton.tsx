import { useMemo } from 'react';
import classnames from 'classnames';
import { CrossIcon } from '../../Icons';
import { slottableComponent } from '../../HOC/slottableComponent';
import { IconButton } from '../../Button/IconButton';

function isDisabled(search?: string) {
	return !search || search.trim().length === 0;
}

function createOnKeyDown(onClick?: () => void) {
	if (typeof onClick !== 'function') {
		return undefined;
	}
	return (e: { key: string }) => {
		if (e.key === 'Enter') {
			onClick();
		}
	};
}

type Props = {
	className?: string;
	search?: string;
	onClick?: () => void;
	editable?: boolean;
};

function LunaticComboboxClearButton({
	className,
	search,
	onClick,
	editable,
}: Props) {
	const onKeyDown = useMemo(() => createOnKeyDown(onClick), [onClick]);
	if (!editable) {
		return null;
	}
	return (
		<IconButton
			className={classnames('mini', 'lunatic-combo-box-fab', className)}
			title="delete"
			onClick={onClick}
			disabled={isDisabled(search)}
			onKeyDown={onKeyDown}
		>
			<CrossIcon className="lunatic-combo-box-icon" />
		</IconButton>
	);
}

export const ComboboxClearButton = slottableComponent(
	'ComboboxClearButton',
	LunaticComboboxClearButton
);
