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
	...otherProps
}) => {
	const [todo, setTodo] = useState({});
	const minLines = Math.max(
		lines.min || 0,
		U.getLoopConstructorInitLines(components)
	);
	const maxLines = lines ? lines.max : undefined;

	const width = `${100 / Math.max(...components.map((row) => row.length))}%`;
	const Button = lunatic.Button;
	const involvedVariables = U.getInvolvedVariables(components);

	useEffect(() => {
		if (Object.keys(todo).length !== 0) {
			const { up, rowNumber } = todo;
			const [key, value] = Object.entries(up)[0];
			const previousValue = bindings[key];
			const newValue = previousValue.map((v, i) =>
				i === rowNumber ? value : v
			);
			handleChange({ [key]: newValue });
			setTodo({});
		}
	}, [bindings, todo, handleChange]);

	const addLine = () => {
		const toHandle = involvedVariables.reduce(
			(acc, { name: iv, depth }) => ({
				...acc,
				[iv]: [...bindings[iv], U.buildEmptyValue(depth)],
			}),
			{}
		);
		handleChange(toHandle);
	};

	return (
		<>
			<Declarations
				id={mainId}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			{mainLabel && (
				<label
					htmlFor={`loops-constructor-${mainId}`}
					id={`loops-constructor-label-${mainId}`}
				>
					{interpret(features)(bindings)(mainLabel)}
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
				components={components}
				bindings={bindings}
				width={width}
				features={features}
				setTodo={setTodo}
				{...otherProps}
			/>
			{!hideBtn && (
				<Button
					label="addLine"
					value={addBtnLabel}
					disabled={
						(Number.isInteger(minLines) && minLines === maxLines) ||
						U.lastLoopChildLineIsEmpty(bindings)(involvedVariables)
					}
					onClick={addLine}
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
