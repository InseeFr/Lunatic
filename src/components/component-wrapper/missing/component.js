import React, { useEffect, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Button from '../../button';
import * as U from '../../../utils/lib';
import './missing.scss';

const Missing = ({ Component, props }) => {
	const {
		dontKnowButton = "Don't know",
		refusedButton = 'Refused',
		missingResponse,
		handleChange,
		preferences,
		missingStrategy,
		missingShortcut = { dontKnow: '', refused: '' },
		response,
		responses,
		cells,
		components,
		savingType,
		bindings,
		shortcut,
		componentType,
		paginatedLoop,
	} = props;

	const missingResponseName = U.getResponseName(missingResponse);
	const buttonState = U.getResponseByPreference(preferences)(missingResponse);
	const [oldMissingValue] = useState(() => buttonState);

	const [bindingsForMissingStrategy, setBindingsForMissingStrategy] =
		useState(null);

	/**
	 * Sources split: use MissingStragy only if missingResponse has been updated
	 * Ensures that missingResponse is persisted when the source has to be changed
	 */
	useEffect(() => {
		const isSameValue = buttonState === oldMissingValue;
		if (bindingsForMissingStrategy && !isSameValue) {
			if (U.isFunction(missingStrategy))
				missingStrategy(bindingsForMissingStrategy);
			setBindingsForMissingStrategy(null);
		}
	}, [
		bindingsForMissingStrategy,
		missingStrategy,
		buttonState,
		oldMissingValue,
	]);

	useEffect(() => {
		if (
			buttonState !== null &&
			U.hasToCleanMissing(savingType)({
				response,
				responses,
				cells,
				components,
			})
		) {
			handleChange({ [missingResponseName]: null });
		}
	}, [
		buttonState,
		handleChange,
		savingType,
		response,
		responses,
		cells,
		components,
		missingResponseName,
	]);

	const getVarsToClean = () =>
		U.getToClean(savingType)({
			response,
			responses,
			cells,
			components,
		});

	const onClick = (value) => () => {
		const isSameValue = buttonState === value;
		if (!isSameValue) {
			const toClean = getVarsToClean();
			if (Object.keys(toClean)) {
				const { currentPage } = props;
				const currentIterationIndex = getCurrentIterationIndex({
					currentPage,
				});
				handleChange(toClean);
				if (U.isFunction(missingStrategy)) {
					const { fullBindings } = props;
					const toHandle = getVarsToHandle({
						toClean,
						fullBindings,
						currentIterationIndex,
					});
					const missingBindings = getMissingBindings({
						currentIterationIndex,
						bindings,
						fullBindings,
						toHandle,
					});
					setBindingsForMissingStrategy(missingBindings);
				}
			} else {
				if (U.isFunction(missingStrategy))
					setBindingsForMissingStrategy(bindings);
			}
			handleChange({ [missingResponseName]: value });
		}
	};

	if ((componentType === 'Loop' && paginatedLoop) || !missingResponse)
		return <Component {...props} />;

	return (
		<div className="missing-wrapper">
			<div className="missing-component">
				<Component {...props} />
			</div>
			<div className="missing-buttons">
				<span
					className={`missing-button${
						buttonState === U.DK ? '-active' : ''
					} missing-button-dk${buttonState === U.DK ? '-active' : ''}`}
				>
					<Button
						label="dont-know-button"
						value={dontKnowButton}
						disabled={!missingResponseName || missingResponseName?.length === 0}
						onClick={onClick(U.DK)}
					/>
				</span>
				<span
					className={`missing-button${
						buttonState === U.RF ? '-active' : ''
					} missing-button-rf${buttonState === U.RF ? '-active' : ''}`}
				>
					<Button
						label="refused-button"
						value={refusedButton}
						disabled={!missingResponseName || missingResponseName?.length === 0}
						onClick={onClick(U.RF)}
					/>
				</span>
			</div>
			{shortcut &&
				missingResponseName?.length > 0 &&
				missingShortcut &&
				missingShortcut.dontKnow &&
				missingShortcut.refused && (
					<KeyboardEventHandler
						handleKeys={Object.values(missingShortcut)}
						onKeyEvent={(key, e) => {
							e.preventDefault();
							if (key === missingShortcut.dontKnow) onClick(U.DK)();
							if (key === missingShortcut.refused) onClick(U.RF)();
						}}
						handleFocusableElements
					/>
				)}
		</div>
	);
};

export default Missing;

// TODO: make it recursive for Loop into Loop
const getCurrentIterationIndex = ({ currentPage }) => {
	const { currentIteration } = U.splitPage(currentPage, 1);
	if (currentIteration) return currentIteration - 1;
	return null;
};

// TODO: make it recursive for Loop into Loop
const getVarsToHandle = ({ toClean, fullBindings, currentIterationIndex }) => {
	if (currentIterationIndex || currentIterationIndex === 0) {
		return Object.entries(toClean).reduce((acc, [name, value]) => {
			const newValue = fullBindings[name].map((v, i) =>
				i === currentIterationIndex ? value : v
			);
			return { ...acc, [name]: newValue };
		}, {});
	}
	return toClean;
};

const getMissingBindings = ({
	bindings,
	fullBindings,
	currentIterationIndex,
	toHandle,
}) => {
	if (currentIterationIndex || currentIterationIndex === 0)
		return { ...fullBindings, ...toHandle };
	return { ...bindings, ...toHandle };
};
