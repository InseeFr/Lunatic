import React, { useState, useEffect } from 'react';
import * as lunatic from '../../components';
import { buildLoopComponents } from './build-components';
import { interpret } from '../../../utils/to-expose';
import * as U from '../../../utils/lib';
import './loop.scss';

const Loop = ({
	id,
	label,
	iterations,
	components,
	bindings,
	handleChange,
	...orchetratorProps
}) => {
	const [todo, setTodo] = useState({});
	const vectorialBindings = U.buildVectorialBindings(bindings);
	const { features } = orchetratorProps;
	const iterationNb = interpret(features)(vectorialBindings)(iterations);
	const involvedVariables = U.getInvolvedVariables(components);

	/**
	 * Handle the increase in the number of iterations
	 */
	useEffect(() => {
		involvedVariables.forEach((iv) => {
			// iterationNb > bindings[iv].length && console.log('effect');
			if (iterationNb > bindings[iv].length)
				handleChange({
					[iv]: [
						...bindings[iv],
						...new Array(iterationNb - bindings[iv].length).fill(null),
					],
				});
		});
	}, [iterationNb, bindings, handleChange, involvedVariables]);

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

	const flattenComponents = buildLoopComponents(iterationNb)(components);

	const loopComponents = flattenComponents.map(
		({ componentType, id: idC, rowNumber, ...rest }) => {
			const loopBindings = U.buildBindingsForDeeperComponents(rowNumber)(
				bindings
			);
			const Component = lunatic[componentType];
			return (
				<div key={`${idC}-loop-${rowNumber}`} className="loop-component">
					<Component
						{...orchetratorProps}
						{...rest}
						id={`${idC}-loop-${rowNumber}`}
						handleChange={(up) => setTodo({ up, rowNumber })}
						bindings={loopBindings}
					/>
				</div>
			);
		}
	);

	return (
		<div id={`loop-${id}`} className="lunatic-loop">
			<div className="loop-label">{label}</div>
			{loopComponents}
		</div>
	);
};

export default React.memo(Loop, U.areEqual);
