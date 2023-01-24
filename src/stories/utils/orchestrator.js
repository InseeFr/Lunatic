import React, { memo, useState } from 'react';
import * as lunatic from '../..';
import './custom-lunatic.scss';
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
	const [toPage, setToPage] = useState(1);

	if (maxPage && maxPage > 1) {
		const Button = lunatic.Button;

		function handleChange(_, value) {
			setToPage(value);
		}

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
					<Button onClick={() => goToPage({ page: `${toPage}` })}>
						{`Go to page ${toPage}`}
					</Button>
					<lunatic.InputNumber
						id="page-to-jump"
						value={toPage}
						handleChange={handleChange}
						min={1}
					/>
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
		activeControls,
	});

	const components = getComponents();
	const errors = getErrors();
	const modalErrors = getModalErrors();
	const currentErrors = getCurrentErrors();

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
									missing={missing}
									missingStrategy={goNextPage}
									shortcut={shortcut}
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
		</Provider>
	);
}

export default memo(OrchestratorForStories);
