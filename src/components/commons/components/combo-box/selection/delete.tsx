import { useMemo } from 'react';
import classnames from 'classnames';
import { CrossIcon } from '../../../icons';
import { Fab } from '../../fab';
import createCustomizableLunaticField from '../../../create-customizable-field';

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

function DeleteCmp({ className, search, onClick, editable }: Props) {
	const onKeyDown = useMemo(() => createOnKeyDown(onClick), [onClick]);
	if (!editable) {
		return null;
	}
	return (
		<Fab
			className={classnames('mini', 'lunatic-combo-box-fab', className)}
			title="delete"
			onClick={onClick}
			disabled={isDisabled(search)}
			onKeyDown={onKeyDown}
		>
			<CrossIcon className="lunatic-combo-box-icon" />
		</Fab>
	);
}

export const Delete = createCustomizableLunaticField(
	DeleteCmp,
	'ComboboxDelete'
);
