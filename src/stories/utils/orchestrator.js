import './custom-lunatic.scss';
import './orchestrator.scss';

import * as lunatic from '../..';

import React, { memo, useCallback, useState } from 'react';

import { Overview } from './overview';
import Waiting from './waiting';

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

function logMissingStrategy() {
	console.log('no missing strategy');
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
	missingStrategy = logMissingStrategy,
	missingShortcut,
	suggesterFetcher,
	autoSuggesterLoading,
	suggesters,
	addExternal,
	preferences,
	custom,
	showOverview = false,
	filterDescription = true,
	dontKnowButton,
	refusedButton,
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
		overview,
		getCurrentErrors,
		getData,
		Provider,
	} = lunatic.useLunatic(source, data, {
		initialPage,
		features,
		preferences,
		onChange: onLogChange,
		custom,
		autoSuggesterLoading,
		suggesters,
		suggesterFetcher,
		management,
		missing,
		missingStrategy,
		missingShortcut,
		shortcut,
		activeControls,
		withOverview: showOverview,
		dontKnowButton,
		refusedButton,
	});

	const components = getComponents();
	const currentErrors = getCurrentErrors();

	const [errorActive, setErrorActive] = useState({});
	const [errorsForModal, setErrorsForModal] = useState(null);

	const skip = useCallback(
		(arg) => {
			setErrorsForModal(undefined);
			goNextPage(arg);
		},
		[goNextPage]
	);

	const goNext = useCallback(() => {
		if (currentErrors && Object.keys(currentErrors).length > 0) {
			setErrorActive({ ...errorActive, [pageTag]: true });
			setErrorsForModal(currentErrors);
		} else skip();
	}, [currentErrors, errorActive, pageTag, skip]);

	return (
		<Provider>
			<div className="container">
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
									// fill error when needed
									errors={errorActive[pageTag] && currentErrors}
									filterDescription={filterDescription}
								/>
							</div>
						);
					})}
				</div>
				<Pager
					goPrevious={goPreviousPage}
					goNext={goNext}
					goToPage={goToPage}
					isLast={isLastPage}
					isFirst={isFirstPage}
					pageTag={pageTag}
					maxPage={maxPage}
					getData={getData}
				/>
				{showOverview && <Overview overview={overview} goToPage={goToPage} />}
				{errorsForModal && (
					<lunatic.Modal errors={errorsForModal} goNext={skip} />
				)}
				<Waiting status={waiting}>
					<div className="waiting-orchestrator">
						Initialisation des données de suggestion...
					</div>
				</Waiting>
			</div>
		</Provider>
	);
}

export default memo(OrchestratorForStories);
