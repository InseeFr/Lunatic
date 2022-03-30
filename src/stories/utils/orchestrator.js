import React, { memo } from 'react';
import * as lunatic from 'components';
import './custom-lunatic.scss';
import Waiting from './waiting';

function getStoreInfoRequired() {
	return {};
}

function BlockingModal({ errors }) {
	if (errors) {
	}
	return <></>;
}

function Pager({ goNext, goPrevious, isLast, isFirst, pageTag, maxPage }) {
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
			</>
		);
	}
	return null;
}

const DEFAULT_DATA = {};
const DEFAULT_FEATURES = ['VTL'];

function OrchestratorForStories({
	source,
	data = DEFAULT_DATA,
	management = false,
	modalForControls = false,
	features = DEFAULT_FEATURES,
	initialPage = '1',
	getStoreInfo = getStoreInfoRequired,
	missing = false,
	shortcut = false,
	activeGoNextForMissing = false,
	suggesterFetcher,
	autoSuggesterLoading,
	addExternal,
	custom,
	...rest
}) {
	const preferences = management
		? ['COLLECTED', 'FORCED', 'EDITED']
		: ['COLLECTED'];
	const savingType = management ? 'EDITED' : 'COLLECTED';
	const { maxPage } = source;
	const {
		getComponents,
		goNextPage,
		goPreviousPage,
		pageTag,
		isFirstPage,
		isLastPage,
		waiting,
		getErrors,
	} = lunatic.useLunatic({
		source,
		data,
		initialPage,
		features,
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
								preferences={preferences}
								savingType={savingType}
								management={management}
								missing={missing}
								shortcut={shortcut}
								custom={custom}
							/>
						</div>
					);
				})}
			</div>
			<Pager
				goNext={goNextPage}
				goPrevious={goPreviousPage}
				isLast={isLastPage}
				isFirst={isFirstPage}
				pageTag={pageTag}
				maxPage={maxPage}
			/>
			<BlockingModal errors={errors} />
			<Waiting status={waiting}>
				<div className="waiting-orchestrator">
					Initialisation des données de suggestion...
				</div>
			</Waiting>
		</div>
	);
}

export default memo(OrchestratorForStories);
