import './custom-lunatic.scss';
import './orchestrator.scss';

import * as lunatic from '../..';

import React, { memo, useCallback, useState, useEffect } from 'react';

import { Logger } from '../../utils/logger';
import { Overview } from './overview';
import Waiting from './waiting';
import { LunaticComponents } from '../..';

function getStoreInfoRequired() {
	return {};
}

function DevOptions({ goToPage, getData, lastReachedPage }) {
	const [toPage, setToPage] = useState(1);

	function handleChange(_, value) {
		setToPage(value);
	}

	return (
		<div className="dev-options">
			<div style={{ display: 'flex' }}>
				<lunatic.Button onClick={() => Logger.log(getData(true))}>
					Get Data
				</lunatic.Button>
				<lunatic.Button onClick={() => goToPage({ page: `${toPage}` })}>
					{`Go to "${toPage}"`}
				</lunatic.Button>
			</div>
			<lunatic.Input
				id="page-to-jump"
				value={toPage}
				handleChange={handleChange}
				min={1}
				label={'Page to reach : '}
			/>
		</div>
	);
}

function Pager({
	goPrevious,
	goNext,
	goToPage,
	lastReachedPage,
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
					<div style={{ fontSize: '.8em', opacity: 0.7, marginTop: '.3em' }}>
						You can use PgDown / PgUp shortcut
					</div>
				</div>
				<DevOptions
					goToPage={goToPage}
					getData={getData}
					lastReachedPage={lastReachedPage}
				/>
				<div className="story-pager">
					<h3>Pager</h3>
					<ul>
						<li>
							<strong>PageTag:</strong> {JSON.stringify(pageTag)}
						</li>
						{Object.keys(pager).map((key) => (
							<li key={key}>
								<strong>{key}:</strong> {JSON.stringify(pager[key])}
							</li>
						))}
					</ul>
				</div>
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
		pager,
		pageTag,
		isFirstPage,
		isLastPage,
		waiting,
		overview,
		compileControls,
		getData,
		Provider,
		hasPageResponse,
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
	const { lastReachedPage } = pager;

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

	// Allow PageDown / PageUp shortcut to ease navigation
	useEffect(() => {
		const listener = (e) => {
			let stopPropagation = false;
			if (e.key === 'PageDown') {
				handleGoNext();
				stopPropagation = true;
			}
			if (e.key === 'PageUp') {
				goPreviousPage();
				stopPropagation = true;
			}
			if (stopPropagation) {
				e.preventDefault();
				e.stopPropagation();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [handleGoNext, goPreviousPage]);

	return (
		<Provider>
			<div className="container story-with-sidebar">
				<div className="components">
					<LunaticComponents
						autoFocusKey={pageTag}
						components={components}
						componentProps={({ storeName }) => ({
							errors: errorActive[pageTag],
							filterDescription: filterDescription,
							disabled: readOnly,
							...(storeName ? getStoreInfo(storeName) : {}),
						})}
					/>
				</div>
				<aside>
					<Pager
						goPrevious={goPreviousPage}
						goNext={handleGoNext}
						goToPage={goToPage}
						lastReachedPage={lastReachedPage}
						isLast={isLastPage}
						isFirst={isFirstPage}
						pageTag={pageTag}
						maxPage={maxPage}
						getData={getData}
						pager={pager}
					/>
					<div className="story-pager">
						<h3>Misc</h3>
						<ul>
							<li>
								<strong>pageHasResponse:</strong>{' '}
								{JSON.stringify(hasPageResponse())}
							</li>
						</ul>
					</div>
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
				</aside>
			</div>
		</Provider>
	);
}

export default memo(OrchestratorForStories);
