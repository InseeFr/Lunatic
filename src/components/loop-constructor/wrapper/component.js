import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as lunatic from '../../components';
import BodyComponent from './body-component';
import Declarations from '../../declarations';
import * as U from '../../../utils/lib';
import * as C from '../../../constants';
import { interpret } from '../../../utils/to-expose';

const LoopConstructorWrapper = ({
	id: mainId,
	label: mainLabel,
	components,
	handleChange,
	lines,
	declarations,
	features,
	bindings,
	addBtnLabel,
	hideBtn,
	componentType,
	...otherProps
}) => {
	const [todo, setTodo] = useState({});

	const featuresWithoutMD = features.filter((f) => f !== 'MD');

	const minLines = Math.max(
		parseInt(interpret(featuresWithoutMD)(bindings)(lines.min), 10) || 1,
		U.getLoopConstructorInitLines(components)
	);
	const maxLines = lines
		? parseInt(interpret(featuresWithoutMD)(bindings)(lines.max), 10)
		: undefined;

	const width = `${100 / Math.max(...components.map((row) => row.length))}%`;
	const Button = lunatic.Button;
	const involvedVariables = U.getInvolvedVariables(components);

	const values = components.reduce(
		(acc, c) => `${acc}|${Object.values(c.response?.values || {}).join('|')}`,
		''
	);

	// TEMP: Set static number of occurence if min = max
	useEffect(() => {
		if (lines.min && lines.min === lines.max) {
			const min =
				parseInt(interpret(featuresWithoutMD)(bindings)(lines.min), 10) || 1;
			const up = involvedVariables.reduce((acc, { name }) => {
				if (min <= bindings[name].length)
					return { ...acc, [name]: [...bindings[name].slice(0, min)] };
				const toAdd = [...Array(min - bindings[name].length).keys()].map(
					() => null
				);
				return { ...acc, [name]: [...bindings[name], ...toAdd] };
			}, {});
			handleChange(up);
		}
		// Assume to only execute this side effect at mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	useEffect(() => {
		if (Object.keys(todo).length !== 0) {
			const { up, rowNumber } = todo;
			const entries = Object.entries(up);
			const toUpdate = entries.reduce((_, [key, value]) => {
				const previousValue = bindings[key];
				const newValue = previousValue.map((v, i) =>
					i === rowNumber ? value : v
				);
				return { ..._, [key]: newValue };
			}, {});
			handleChange(toUpdate);
			setTodo({});
		}
	}, [bindings, todo, handleChange]);

	const addLine = () => {
		const toHandle = involvedVariables.reduce(
			(acc, { name: iv }) => ({
				...acc,
				[iv]: [...bindings[iv], null],
			}),
			{}
		);
		handleChange(toHandle);
	};

	const customBtnLabel =
		(componentType === 'Loop' &&
			interpret(features, otherProps?.logFunction)(bindings)(mainLabel)) ||
		addBtnLabel;

	return (
		<>
			<Declarations
				id={mainId}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			{componentType === 'RosterForLoop' && mainLabel && (
				<label
					htmlFor={`loops-constructor-${mainId}`}
					id={`loops-constructor-label-${mainId}`}
				>
					{interpret(features, otherProps?.logFunction)(bindings)(mainLabel)}
				</label>
			)}
			<Declarations
				id={mainId}
				type={C.AFTER_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<BodyComponent
				mainId={mainId}
				componentType={componentType}
				components={components}
				bindings={bindings}
				width={width}
				features={features}
				setTodo={setTodo}
				{...otherProps}
			/>
			{!hideBtn && Number.isInteger(minLines) && minLines !== maxLines && (
				<Button
					label="addLine"
					value={customBtnLabel}
					// disabled={
					// Number.isInteger(minLines) && minLines === maxLines
					//||
					// Want to enable addition depsite of empty lines?
					// 	U.lastLoopChildLineIsEmpty(bindings)(involvedVariables)
					// }
					onClick={addLine}
					id={mainId}
					logFunction={otherProps?.logFunction}
				/>
			)}
			<Declarations
				id={mainId}
				type={C.DETACHABLE}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
		</>
	);
};

LoopConstructorWrapper.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	components: [],
	lines: {},
	positioning: 'DEFAULT',
	declarations: [],
	features: [],
	bindings: {},
	addBtnLabel: 'Add a line',
	management: false,
	hideBtn: false,
	style: {},
};

LoopConstructorWrapper.propTypes = {
	componentType: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	components: PropTypes.array,
	handleChange: PropTypes.func.isRequired,
	lines: U.linesPropTypes,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	addBtnLabel: PropTypes.string,
	hideBtn: PropTypes.bool,
	management: PropTypes.bool,
	style: PropTypes.object,
};

export default React.memo(LoopConstructorWrapper, U.areEqual);
