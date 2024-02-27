import './Missing.scss';
import { useCallback } from 'react';
import { DK, RF } from '../../../utils/constants';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useLunaticMissing } from '../../../use-lunatic/lunatic-context';
import type { LunaticBaseProps } from '../../type';
import { Button } from '../Button/Button';

type Props = {
	handleChange: LunaticBaseProps<any>['handleChange'];
	componentType?: string;
	paginatedLoop?: boolean;
	disabled?: boolean;
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
	props: Pick<Props, 'handleChange' | 'missingResponse' | 'disabled'> &
		PropsFromContext
) => {
	const {
		missingResponse,
		handleChange,
		missingStrategy,
		shortcut,
		missingShortcut,
		dontKnowButton,
		refusedButton,
		disabled,
	} = props;
	const value = missingResponse?.value;
	const onClick = (value: 'DK' | 'RF') => {
		handleChange(missingResponse ?? { name: 'UNKNOWN' }, value);
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

	return (
		<div className="missing-buttons">
			<span
				className={`missing-button${
					value === DK ? '-active' : ''
				} missing-button-dk${value === DK ? '-active' : ''}`}
			>
				<Button
					disabled={disabled}
					label={dontKnowButton}
					onClick={onClickDK}
				/>
			</span>
			<span
				className={`missing-button${
					value === RF ? '-active' : ''
				} missing-button-rf${value === RF ? '-active' : ''}`}
			>
				<Button disabled={disabled} label={refusedButton} onClick={onClickRF} />
			</span>
			{shortcut &&
				missingShortcut &&
				missingShortcut.dontKnow &&
				missingShortcut.refused && (
					<KeyboardEventHandler
						handleKeys={Object.values(missingShortcut)}
						handleEventType="keydown"
						onKeyEvent={(key, e) => {
							e.preventDefault();
							if (key === missingShortcut.dontKnow) onClickDK();
							if (key === missingShortcut.refused) onClickRF();
						}}
						handleFocusableElements
					/>
				)}
		</div>
	);
};

export default Missing;
