import React, { useState, useEffect } from 'react';
import * as lunatic from '../components';
import { buildLoopComponents } from './build-components';
import { interpret } from '../../utils/to-expose';
import * as U from '../../utils/lib';
import './loop.scss';

const PaginatedLoop = ({
	id,
	label,
	iterations,
	components,
	bindings,
	handleChange,
	loopDependencies,
	maxPage,
	pagination,
	paginatedLoop,
	currentPage,
	setPage,
	flow,
	depth,
	...orchetratorProps
}) => {
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

	/**
	 * Handle init page
	 */
	if (
		paginatedLoop &&
		depth > `${currentPage.split('.').length - 1}` &&
		U.displayLoop(loopDependencies)(bindings)
	) {
		if (flow === U.FLOW_NEXT) {
			setPage(`${currentPage}.1#1`);
		} else if (flow === U.FLOW_PREVIOUS) {
			setPage(`${currentPage}.${maxPage}#${iterationNb}`);
		}
		return null;
	}

	const flattenComponents = buildLoopComponents(iterationNb)(components);

	if (!U.displayLoop(loopDependencies)(bindings)) {
		return <div>Pas de questionnaire individuel, passez à la suite</div>;
	}

	const currentPageWithoutIteration = currentPage
		.split('#')
		.slice(0, -1)
		.join('#');

	const currentPageWithoutAnyIteration = currentPage
		.split('.')
		.map((e) => e.split('#')[0])
		.join('.');

	const rootPage = currentPageWithoutIteration
		.split('.')
		.slice(0, -1)
		.join('.');

	const currentComponentIndex = parseInt(
		currentPageWithoutIteration.split('.').slice().pop()
	);

	const currentIteration = parseInt(currentPage.split('#').pop(), 10);

	// Previous at first component
	if (currentComponentIndex < 1) {
		setPage(`${rootPage}.${maxPage}#${currentIteration - 1}`);
		return null;
	}

	// Next at last component
	if (
		depth === `${currentPage.split('.').length - 1}` &&
		currentComponentIndex > maxPage
	) {
		setPage(`${rootPage}.1#${currentIteration + 1}`);
		return null;
	}

	// Previous at first iteration
	if (currentIteration < 1) {
		const splitRoot = rootPage.split('.');
		if (splitRoot.length === 1) setPage(`${parseInt(splitRoot[0], 10) - 1}`);
		else {
			const withoutLast = splitRoot.slice(0, -1).join('.');
			const subPagesToUpdate = withoutLast.slice().pop().split('#');
			const newSubPage = `${parseInt(subPagesToUpdate[0], 10) - 1}#${
				subPagesToUpdate[1]
			}`;
			const newPage = [...withoutLast.slice().pop(), newSubPage].join('.');
			setPage(`${newPage}`);
		}
		return null;
	}

	// Next at last iteration
	if (currentIteration > iterationNb) {
		const splitRoot = rootPage.split('#');
		const newRootPage =
			splitRoot.length === 1
				? parseInt(splitRoot[0], 10) + 1
				: splitRoot.slice(0, -1).join('#');
		if (splitRoot.length === 1) setPage(`${newRootPage}`);
		else {
			const newIteration = parseInt(splitRoot.pop(), 10) + 1;
			setPage(`${newRootPage}#${newIteration}`);
		}
		return null;
	}

	const loopComponents = flattenComponents.reduce(
		(
			acc,
			{ componentType, id: idC, rowNumber, conditionFilter, page, ...rest }
		) => {
			const loopBindings = U.buildBindingsForDeeperComponents(rowNumber)(
				bindings
			);
			if (!U.displayLoopQuestion(loopDependencies)(loopBindings)) return null;
			const Component = lunatic[componentType];
			if (
				interpret(features)(loopBindings, true)(conditionFilter) !== 'normal' ||
				(pagination && !currentPageWithoutAnyIteration.startsWith(page)) ||
				rowNumber + 1 !== currentIteration
			)
				return acc;
			return [
				...acc,
				<div key={`${idC}-loop-${rowNumber}`} className="loop-component">
					<Component
						{...orchetratorProps}
						{...rest}
						id={`${idC}-loop-${rowNumber}`}
						handleChange={(up) => setTodo({ up, rowNumber })}
						bindings={loopBindings}
						componentType={componentType}
						pagination={pagination}
						currentPage={currentPage}
						setPage={setPage}
						flow={flow}
					/>
				</div>,
			];
		},
		[]
	);

	if (loopComponents.length === 0) {
		if (flow === U.FLOW_NEXT) {
			setPage(`${rootPage}.${currentComponentIndex + 1}#${currentIteration}`);
		} else if (flow === U.FLOW_PREVIOUS) {
			setPage(`${rootPage}.${currentComponentIndex - 1}#${currentIteration}`);
		}
		return null;
	}

	return (
		<div id={`loop-${id}`} className="lunatic-loop">
			{loopComponents}
		</div>
	);
};

export default React.memo(PaginatedLoop, U.areEqual);
