import './missing.scss';

import { DK, RF } from '../../../../utils/constants';
import React, { useCallback } from 'react';

import Button from '../../../button';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useLunaticMissing } from '../../../../use-lunatic/lunatic-context';
import useOnHandleChange from '../../use-on-handle-change';

const Missing = (props) => {
	const propsContext = useLunaticMissing();
	if (!propsContext.missing || !props.missingResponse) {
		return null;
	}
	if (props.componentType === 'Loop' && props.paginatedLoop) {
		return null;
	}
	return <MissingPure {...props} {...propsContext} />;
};

export const MissingPure = (props) => {
	const {
		missingResponse,
		handleChange,
		missingStrategy,
		shortcut,
		missingShortcut,
		dontKnowButton,
		refusedButton,
	} = props;
	const value = missingResponse?.value;
	const onClick = useOnHandleChange({
		handleChange,
		response: missingResponse,
		value,
	});

	const handleMissingStrategy = useCallback(() => {
		if (missingStrategy) missingStrategy();
	}, [missingStrategy]);

	const onClickDK = useCallback(() => {
		onClick(DK);
		handleMissingStrategy();
	}, [onClick, handleMissingStrategy]);

	const onClickRF = useCallback(() => {
		onClick(RF);
		handleMissingStrategy();
	}, [onClick, handleMissingStrategy]);

	return (
		<div className="missing-buttons">
			<span
				className={`missing-button${
					value === DK ? '-active' : ''
				} missing-button-dk${value === DK ? '-active' : ''}`}
			>
				<Button label={dontKnowButton} onClick={onClickDK} />
			</span>
			<span
				className={`missing-button${
					value === RF ? '-active' : ''
				} missing-button-rf${value === RF ? '-active' : ''}`}
			>
				<Button label={refusedButton} onClick={onClickRF} />
			</span>
			{shortcut &&
				missingShortcut &&
				missingShortcut.dontKnow &&
				missingShortcut.refused && (
					<KeyboardEventHandler
						handleKeys={Object.values(missingShortcut)}
						handleEventType="keypress"
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
