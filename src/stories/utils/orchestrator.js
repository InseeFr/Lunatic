import React, { memo, useState } from 'react';

import * as lunatic from '../..';
import './custom-lunatic.scss';
import Waiting from './waiting';

import './orchestrator.scss';
import { getPagerFromPageTag } from '../../use-lunatic/commons/page-tag';

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
			<div style={{ display: 'flex' }}>
				<lunatic.Button onClick={() => console.log(getData(true))}>
					Get Data
				</lunatic.Button>
				<lunatic.Button
					onClick={() => goToPage(getPagerFromPageTag(toPage.toString()))}
				>
					{`Go to page ${toPage}`}
				</lunatic.Button>
			</div>
			<lunatic.Input
				id="page-to-jump"
				value={toPage}
				handleChange={handleChange}
				label={'Page'}
				description={'the page wher you want to jump'}
			/>
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
	pager,
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
				<ul style={{ margin: 0, padding: 0, paddingLeft: 20, lineHeight: 1.6 }}>
					<li>
						<strong>PageTag:</strong> {pageTag}
					</li>
					<li>
						<strong>Page:</strong> {JSON.stringify(pager.page)} /{' '}
						{JSON.stringify(pager.maxPage)}
					</li>
					<li>
						<strong>Iteration:</strong> {JSON.stringify(pager.iteration)} /{' '}
						{JSON.stringify(pager.maxIteration)}
					</li>
				</ul>
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

						console.log('props', { other, rest, component, storeInfo });

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
						pager={pager}
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
