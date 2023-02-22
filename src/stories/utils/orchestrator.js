import React, { memo, useState } from 'react';

import * as lunatic from '../..';
import './custom-lunatic.scss';
import Waiting from './waiting';

import './orchestrator.scss';

function getStoreInfoRequired() {
	return {};
}

function DevOptions({ goToPage, getData }) {
	const [toPage, setToPage] = useState(1);

	function handleChange(_, value) {
		setToPage(value);
	}

	return (
		<div className="dev-options">
			<div className="title">Options développeur</div>
			<div className="contenur">
				<lunatic.Button onClick={() => console.log(getData(true))}>
					Get State
				</lunatic.Button>
				<lunatic.Button onClick={() => goToPage({ page: `${toPage}` })}>
					{`Go to page ${toPage}`}
				</lunatic.Button>
				<lunatic.InputNumber
					id="page-to-jump"
					value={toPage}
					handleChange={handleChange}
					min={1}
					label={'Page'}
					description={'the page wher you want to jump'}
				/>
			</div>
		</div>
	);
}

function Pager({
	goPrevious,
	goNext,
	goToPage,
	isLast,
	isFirst,
	pageTag,
	maxPage,
	getData,
}) {
	if (maxPage && maxPage > 1) {
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
				<DevOptions goToPage={goToPage} getData={getData} />
			</>
		);
	}
	return null;
}

function onLogChange(response, value, args) {
	console.log('onChange', { response, value, args });
}

function OrchestratorForStories({
	source,
	data,
	management = false,
	shortcut = false,
	activeControls = false,
	features,
	initialPage = '1',
	getStoreInfo = getStoreInfoRequired,
	missing = false,
	activeGoNextForMissing = false,
	suggesterFetcher,
	autoSuggesterLoading,
	suggesters,
	addExternal,
	preferences,
	custom,
	filterDescription = true,
	...rest
}) {
	const { maxPage } = source;
	const {
		getComponents,
		goPreviousPage,
		goNextPage,
		goToPage,
		pageTag,
		isFirstPage,
		isLastPage,
		waiting,
		getErrors,
		getModalErrors,
		getCurrentErrors,
		pager,
		getData,
		Provider,
	} = lunatic.useLunatic(source, data, {
		initialPage,
		features,
		preferences,
		onChange: onLogChange,
		custom,
		activeGoNextForMissing,
		autoSuggesterLoading,
		suggesters,
		suggesterFetcher,
		management,
		shortcut,
		activeControls,
	});

	const components = getComponents();
	const errors = getErrors();
	const modalErrors = getModalErrors();
	const currentErrors = getCurrentErrors();

	return (
		<Provider>
			<div className="container story-with-sidebar">
				<div className="components">
					{components.map(function (component) {
						const {
							id,
							componentType,
							response,
							storeName,
							conditionFilter,
							...other
						} = component;
						const Component = lunatic[componentType];

						const storeInfo = storeName ? getStoreInfo(storeName) : {};
						return (
							<div
								className="lunatic lunatic-component"
								key={`component-${id}`}
							>
								<Component
									id={id}
									response={response}
									{...other}
									{...rest}
									{...component}
									{...storeInfo}
									missing={missing}
									missingStrategy={goNextPage}
									filterDescription={filterDescription}
									errors={currentErrors}
								/>
							</div>
						);
					})}
				</div>
				<aside>
					<Pager
						goPrevious={goPreviousPage}
						goNext={goNextPage}
						goToPage={goToPage}
						isLast={isLastPage}
						isFirst={isFirstPage}
						pageTag={pageTag}
						maxPage={maxPage}
						getData={getData}
					/>
					<lunatic.Modal errors={modalErrors} goNext={goNextPage} />
					<Waiting status={waiting}>
						<div className="waiting-orchestrator">
							Initialisation des données de suggestion...
						</div>
					</Waiting>
				</aside>
			</div>
		</Provider>
	);
}

export default memo(OrchestratorForStories);
