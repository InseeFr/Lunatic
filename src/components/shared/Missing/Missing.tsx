import { useCallback } from 'react';
import { DK, RF } from '../../../utils/constants';
import { useLunaticMissing } from '../../../use-lunatic/lunatic-context';
import type { LunaticBaseProps } from '../../type';
import { Button } from '../Button/Button';
import { useKeyboardKey } from '../../../hooks/useKeyboardKey';

type Props = {
	handleChanges: LunaticBaseProps<any>['handleChanges'];
	componentType?: string;
	paginatedLoop?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	missingResponse?: LunaticBaseProps['missingResponse'];
};

type PropsFromContext = Pick<
	ReturnType<typeof useLunaticMissing>,
	| 'shortcut'
	| 'missingStrategy'
	| 'dontKnowButton'
	| 'refusedButton'
	| 'missingShortcut'
>;

export const Missing = (props: Props) => {
	const propsContext = useLunaticMissing();
	if (!propsContext.missing || !props.missingResponse) {
		return null;
	}
	if (props.componentType === 'Loop' && props.paginatedLoop) {
		return null;
	}

	return <MissingPure {...props} {...propsContext} />;
};

export const MissingPure = (
	props: Pick<
		Props,
		'handleChanges' | 'missingResponse' | 'disabled' | 'readOnly'
	> &
		PropsFromContext
) => {
	const {
		missingResponse,
		handleChanges,
		missingStrategy,
		shortcut,
		missingShortcut,
		dontKnowButton,
		refusedButton,
		disabled,
		readOnly,
	} = props;
	const value = missingResponse?.value;
	const onClick = (value: 'DK' | 'RF') => {
		handleChanges([{ name: missingResponse?.name ?? 'UNKNOWN', value }]);
	};

	const handleMissingStrategy = useCallback(() => {
		if (missingStrategy) missingStrategy();
	}, [missingStrategy]);

	const onClickDK = () => {
		onClick(DK);
		handleMissingStrategy();
	};

	const onClickRF = () => {
		onClick(RF);
		handleMissingStrategy();
	};

	const hasKeyboardShortcut = Boolean(
		shortcut &&
			!disabled &&
			!readOnly &&
			missingShortcut &&
			missingShortcut.dontKnow &&
			missingShortcut.refused
	);

	useKeyboardKey(
		Object.values(missingShortcut),
		(e) => {
			e.preventDefault();
			if (e.key.toLowerCase() === missingShortcut.dontKnow.toLowerCase())
				onClickDK();
			if (e.key.toLowerCase() === missingShortcut.refused.toLowerCase())
				onClickRF();
		},
		hasKeyboardShortcut
	);

	return (
		<div className="missing-buttons">
			<span
				className={`missing-button${
					value === DK ? '-active' : ''
				} missing-button-dk${value === DK ? '-active' : ''}`}
			>
				<Button
					selected={value === DK}
					disabled={disabled}
					readOnly={readOnly}
					label={dontKnowButton}
					onClick={onClickDK}
				/>
			</span>
			<span
				className={`missing-button${
					value === RF ? '-active' : ''
				} missing-button-rf${value === RF ? '-active' : ''}`}
			>
				<Button
					selected={value === RF}
					disabled={disabled}
					readOnly={readOnly}
					label={refusedButton}
					onClick={onClickRF}
				/>
			</span>
		</div>
	);
};

export default Missing;
