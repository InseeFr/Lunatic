import './custom-lunatic.scss';
import './orchestrator.scss';
import * as lunatic from '../..';
import React, { memo, useCallback, useState } from 'react';
import { Overview } from './overview';
import Waiting from './waiting';
import { Logger } from '../../utils/logger';

function getStoreInfoRequired() {
	return {};
}

function DevOptions({ goToPage, getData }) {
	const [toPage, setToPage] = useState('2.1#2|5');

	function handleChange(_, value) {
		setToPage(value);
	}

	return (
		<div className="dev-options">
			<div className="title">Options développeur</div>
			<div className="contenur">
				<lunatic.Button onClick={() => Logger.log(getData(true))}>
					Get State
				</lunatic.Button>
				<lunatic.Button onClick={() => goToPage({ pageTag: toPage })}>
					{`Go to page ${toPage}`}
				</lunatic.Button>
				<lunatic.Input
					id="page-to-jump"
					value={toPage}
					handleChange={handleChange}
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
	Logger.log('onChange', { response, value, args });
}

function logMissingStrategy() {
	Logger.log('no missing strategy');
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
	autoSuggesterLoading,
	addExternal,
	preferences,
	custom,
	showOverview = false,
	filterDescription = true,
	getReferentiel,
	dontKnowButton,
	refusedButton,
	readOnly,
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
		compileControls,
		getData,
		Provider,
	} = lunatic.useLunatic(source, data, {
		initialPage,
		features,
		preferences,
		onChange: onLogChange,
		custom,
		autoSuggesterLoading,
		getReferentiel,
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

	const [errorActive, setErrorActive] = useState({});
	const [errorsForModal, setErrorsForModal] = useState(null);

	const skip = useCallback(
		(arg) => {
			setErrorsForModal(undefined);
			goNextPage(arg);
		},
		[goNextPage]
	);

	const closeModal = useCallback(() => setErrorsForModal(undefined), []);

	const handleGoNext = useCallback(() => {
		const { currentErrors, isCritical } = compileControls();
		setErrorActive({ ...errorActive, [pageTag]: currentErrors || {} });
		if (currentErrors && Object.keys(currentErrors).length > 0) {
			setErrorsForModal({ currentErrors, isCritical });
		} else goNextPage();
	}, [compileControls, errorActive, goNextPage, pageTag]);

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
									errors={errorActive[pageTag]}
									filterDescription={filterDescription}
									disabled={readOnly}
								/>
							</div>
						);
					})}
				</div>
				<Pager
					goPrevious={goPreviousPage}
					goNext={handleGoNext}
					goToPage={goToPage}
					isLast={isLastPage}
					isFirst={isFirstPage}
					pageTag={pageTag}
					maxPage={maxPage}
					getData={getData}
				/>
				{showOverview && <Overview overview={overview} goToPage={goToPage} />}
				{errorsForModal && (
					<lunatic.Modal
						errors={errorsForModal.currentErrors}
						goNext={skip}
						onClose={closeModal}
						isCritical={errorsForModal.isCritical}
					/>
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
