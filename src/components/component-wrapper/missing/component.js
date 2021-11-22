import React, { useEffect } from 'react';
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
		missingLoopIteration,
	} = props;

	const buttonState = U.getResponseByPreference(preferences)(missingResponse);

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
			handleChange({ [U.getResponseName(missingResponse)]: null });
		}
	}, [
		buttonState,
		handleChange,
		savingType,
		response,
		responses,
		cells,
		components,
		missingResponse,
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
				const { fullBindings, missingLoopIteration, currentPage } = props;
				const currentIterationIndex = getCurrentIterationIndex({
					currentPage,
					missingLoopIteration,
				});
				const toHandle = getVarsToHandle({
					toClean,
					fullBindings,
					currentIterationIndex,
				});
				handleChange(toHandle);
				if (U.isFunction(missingStrategy)) {
					const { fullBindings } = props;
					const missingBindings = getMissingBindings({
						currentIterationIndex,
						bindings,
						fullBindings,
						toHandle,
					});
					missingStrategy(missingBindings);
				}
			} else {
				if (U.isFunction(missingStrategy)) missingStrategy(bindings);
			}
			// TODO: handle missing as vectorial variables
			handleChange({ [U.getResponseName(missingResponse)]: value });
		}
	};

	if (
		componentType === 'Loop' ||
		missingLoopIteration ||
		missingLoopIteration === 0
	)
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
						onClick={onClick(U.RF)}
					/>
				</span>
			</div>
			{shortcut &&
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
const getCurrentIterationIndex = ({ currentPage, missingLoopIteration }) => {
	const { currentIteration } = U.splitPage(currentPage, 1);
	if (currentIteration) return currentIteration - 1;
	if (missingLoopIteration || missingLoopIteration === 0)
		return missingLoopIteration;
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
	if (currentIterationIndex || currentIterationIndex !== 0)
		return { ...bindings, ...toHandle };
	return { ...fullBindings, ...toHandle };
};
