import './custom-lunatic.scss';

import * as lunatic from '../..';

import React, { memo } from 'react';

import Waiting from './waiting';

function getStoreInfoRequired() {
	return {};
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
					<Button onClick={() => console.log(getData(true))}>Get State</Button>
					<Button onClick={() => goToPage({ page: '18' })}>
						Go to page 18
					</Button>
				</div>
				<div>PAGE: {pageTag}</div>
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
	activeControls = false,
	features,
	initialPage = '1',
	getStoreInfo = getStoreInfoRequired,
	missing = false,
	// two following props override non-response buttons cf. docs/{lg}/missing.md
	dontKnowButton,
	refusedButton,
	shortcut = false,
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
		getData,
	} = lunatic.useLunatic(source, data, {
		initialPage,
		features,
		preferences,
		onChange: onLogChange,
		activeGoNextForMissing,
		autoSuggesterLoading,
		suggesters,
		suggesterFetcher,
		management,
		activeControls,
	});

	const components = getComponents();
	const errors = getErrors();
	const modalErrors = getModalErrors();
	const currentErrors = getCurrentErrors();

	return (
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
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								id={id}
								response={response}
								{...other}
								{...rest}
								{...component}
								{...storeInfo}
								missing={missing}
								dontKnowButton={dontKnowButton}
								refusedButton={refusedButton}
								missingStrategy={goNextPage}
								shortcut={shortcut}
								custom={custom}
								filterDescription={filterDescription}
								errors={currentErrors}
							/>
						</div>
					);
				})}
			</div>
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
		</div>
	);
}

export default memo(OrchestratorForStories);
