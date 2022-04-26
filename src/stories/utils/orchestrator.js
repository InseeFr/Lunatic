import React, { memo, useCallback } from 'react';
import * as lunatic from 'components';
import './custom-lunatic.scss';
import Waiting from './waiting';

function getStoreInfoRequired() {
	return {};
}

function Pager({ goNext, goPrevious, isLast, isFirst, pageTag }) {
	if (isFirst && isLast) {
		return null;
	}
	const Button = lunatic.Button;
	return (
		<>
			<div className="pagination">
				<Button onClick={goPrevious} disabled={isFirst}>
					Previous
				</Button>
				<Button onClick={goNext} disabled={isLast}>
					Next
				</Button>
			</div>
			<div>PAGE: {pageTag}</div>
		</>
	);
}

const DEFAULT_DATA = {};
const DEFAULT_FEATURES = ['VTL'];

function onLogChange(response, value, args) {
	console.log('onChange', { response, value, args });
}

function OrchestratorForStories({
	source,
	data = DEFAULT_DATA,
	management = false,
	modalForControls = false,
	features = DEFAULT_FEATURES,
<<<<<<< HEAD
	bindings: initialBindings,
<<<<<<< HEAD
	initialPage = '1', // ou 1.1 ...
=======
	initialPage = '1',
>>>>>>> optimisation
=======
	initialPage = '6', // ou 1.1 ...
>>>>>>> 49f5e5f6ee969ff0745f5447540dc837bc4b0447
	getStoreInfo = getStoreInfoRequired,
	missing = false,
	shortcut = false,
	activeGoNextForMissing = false,
	suggesterFetcher,
	autoSuggesterLoading,
	addExternal,
	preferences,
	custom,
	...rest
}) {
	const { maxPage } = source;

	const {
		getComponents,
<<<<<<< HEAD
		goNextPage,
		goPreviousPage,
		pageTag,
		isFirstPage,
		isLastPage,
=======
		goNext,
		goPrevious,
		handleChange,
		pageTag,
		isFirst,
		isLast,
		executeExpression,
>>>>>>> 49f5e5f6ee969ff0745f5447540dc837bc4b0447
		waiting,
		getErrors,
	} = lunatic.useLunatic({
		source,
		initialPage,
		features,
		preferences,
		onChange: onLogChange,
	});

	const components = getComponents();
	const errors = getErrors();

	return (
		<div className="container">
			<div className="components">
				{components.map(function (component) {
					const { id, componentType, response, storeName, ...other } =
						component;
					const Component = lunatic[componentType];
					const storeInfo = storeName ? getStoreInfo(storeName) : {};

					return (
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								id={id}
								response={response}
								{...other}
								{...rest}
								{...component}
								{...storeInfo}
								missing={missing}
								shortcut={shortcut}
								custom={custom}
							/>
						</div>
					);
				})}
			</div>
<<<<<<< HEAD
			{
				<Pager
					goNext={goNext}
					goPrevious={goPrevious}
					isLast={isLast}
					isFirst={isFirst}
					pageTag={pageTag}
					maxPage={maxPage}
				/>
			}
			{
				<Waiting status={waiting}>
					<div className="waiting-orchestrator">
						Initialisation des données de suggestion...
					</div>
				</Waiting>
			}
=======
			<Pager
				goNext={goNextPage}
				goPrevious={goPreviousPage}
				isLast={isLastPage}
				isFirst={isFirstPage}
				pageTag={pageTag}
				maxPage={maxPage}
			/>
			<lunatic.Modal
				title="Des points requièrent votre attention."
				errors={errors}
				goNext={goNextPage}
			/>
			<Waiting status={waiting}>
				<div className="waiting-orchestrator">
					Initialisation des données de suggestion...
				</div>
			</Waiting>
>>>>>>> optimisation
		</div>
	);
}

export default memo(OrchestratorForStories);
