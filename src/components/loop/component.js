import React, { useState, useEffect } from 'react';
import * as lunatic from '../components';
import { buildLoopComponents } from './build-components';
import { interpret } from '../../utils/to-expose';
import * as U from '../../utils/lib';
import './loop.scss';

const Loop = ({
	id,
	label,
	iterations,
	components,
	bindings,
	handleChange,
	loopDependencies,
	pagination,
	paginatedLoop,
	currentPage,
	setPage,
	...orchetratorProps
}) => {
	if (paginatedLoop && !currentPage.split('#').pop().includes('.'))
		setPage(`${currentPage}.1`);

	const [todo, setTodo] = useState({});
	const vectorialBindings = U.buildVectorialBindings(bindings);
	const { features } = orchetratorProps;
	const iterationNb =
		parseInt(interpret(features)(vectorialBindings)(iterations), 10) || 0;
	const involvedVariables = U.getInvolvedVariables(components);

	/**
	 * Handle the increase in the number of iterations
	 * Assume we only want to update if iterationNb changes
	 */
	useEffect(() => {
		const toUpdate = involvedVariables.reduce((acc, { name: iv, depth }) => {
			if (bindings[iv] && iterationNb > bindings[iv].length)
				return {
					...acc,
					[iv]: [
						...bindings[iv],
						...new Array(iterationNb - bindings[iv].length).fill(
							U.buildEmptyValue(depth)
						),
					],
				};
			return acc;
		}, {});
		if (Object.keys(toUpdate).length !== 0) handleChange(toUpdate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iterationNb]);

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

	if (!U.displayLoop(loopDependencies)(bindings)) {
		return <div>Pas de questionnaire individuel, passez à la suite</div>;
	}

	const loopComponents = flattenComponents.map(
		({ componentType, id: idC, rowNumber, conditionFilter, page, ...rest }) => {
			const loopBindings = U.buildBindingsForDeeperComponents(rowNumber)(
				bindings
			);
			if (!U.displayLoopQuestion(loopDependencies)(loopBindings)) return null;
			const Component = lunatic[componentType];

			if (
				interpret(features)(loopBindings, true)(conditionFilter) !== 'normal' ||
				(pagination && page !== currentPage)
			)
				return null;
			return (
				<div key={`${idC}-loop-${rowNumber}`} className="loop-component">
					<Component
						{...orchetratorProps}
						{...rest}
						id={`${idC}-loop-${rowNumber}`}
						handleChange={(up) => setTodo({ up, rowNumber })}
						bindings={loopBindings}
						componentType={componentType}
					/>
				</div>
			);
		}
	);

	return (
		<div id={`loop-${id}`} className="lunatic-loop">
			{loopComponents}
		</div>
	);
};

export default React.memo(Loop, U.areEqual);
