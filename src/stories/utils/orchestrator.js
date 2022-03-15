import React, { memo } from 'react';
import * as lunatic from 'components';
import './custom-lunatic.scss';
import Waiting from './waiting';

function getStoreInfoRequired() {
	return {};
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
	bindings: initialBindings,
	initialPage = '18',
	getStoreInfo = getStoreInfoRequired,
	missing = false,
	shortcut = false,
	activeGoNextForMissing = false,
	suggesterFetcher,
	autoSuggesterLoading,
	addExternal,
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
		handleChange,
		pageTag,
		isFirstPage,
		isLastPage,
		executeExpression,
		waiting,
	} = lunatic.useLunatic({
		source,
		data,
		initialPage,
		features,
	});

	const components = getComponents();

	return (
		<div className="container">
			<div className="components">
				{components.map(function (component) {
					const { id, componentType, response, ...other } = component;
					const Component = lunatic[componentType];
					return (
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								id={id}
								response={response}
								{...other}
								{...rest}
								{...component}
								handleChange={handleChange}
								preferences={preferences}
								savingType={savingType}
								management={management}
								missing={missing}
								shortcut={shortcut}
								executeExpression={executeExpression}
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
			<Waiting status={waiting}>
				<div className="waiting-orchestrator">
					Initialisation des données de suggestion...
				</div>
			</Waiting>
		</div>
	);

	// /* */
	// const {
	// 	handleExternals,
	// 	components,
	// 	bindings,
	// 	pagination: {
	// 		goNext,
	// 		goPrevious,
	// 		page,
	// 		setPage,
	// 		maxPage,
	// 		isFirstPage,
	// 		isLastPage,
	// 		flow,
	// 	},
	// } = lunatic.useLunatic(source, data, {
	// 	suggesters,
	// 	savingType,
	// 	preferences,
	// 	features,
	// 	management,
	// 	pagination,
	// 	modalForControls,
	// 	initialPage,
	// 	suggesterFetcher,
	// 	autoSuggesterLoading,
	// });

	// useEffect(() => {
	// 	handleExternals(addExternal);
	// }, [addExternal, handleExternals]);

	// const Button = lunatic.Button;

	// const missingStrategy = (b) => goNext(null, b);

	// return (
	// 	<div className="container">
	// 		<div className="components">
	// 			{components.map((q) => {
	// 				const { id, componentType } = q;
	// 				const Component = lunatic[componentType];
	// 				const { storeName } = q;

	// 				return (
	// 					<div className="lunatic lunatic-component" key={`component-${id}`}>
	// 						<Component
	// 							{...rest}
	// 							{...q}
	// 							{...getStoreInfo(storeName)}
	// 							handleChange={handleChange}
	// 							preferences={preferences}
	// 							savingType={savingType}
	// 							management={management}
	// 							features={features}
	// 							bindings={{ ...bindings, ...initialBindings }}
	// 							currentPage={page}
	// 							setPage={setPage}
	// 							flow={flow}
	// 							pagination={pagination}
	// 							missing={missing}
	// 							shortcut={shortcut}
	// 							missingStrategy={activeGoNextForMissing && missingStrategy}
	// 						/>
	// 					</div>
	// 				);
	// 			})}
	// 		</div>
	// 		{pagination && (
	// 			<>
	// 				<div className="pagination">
	// 					<Button
	// 						onClick={goPrevious}
	// 						disabled={isFirstPage}
	// 						value="Previous"
	// 					/>
	// 					<Button onClick={goNext} disabled={isLastPage} value="Next" />
	// 				</div>
	// 				<div>{`Page : ${page}/${maxPage}`}</div>
	// 			</>
	// 		)}
	// 	</div>
	// );
}

export default memo(OrchestratorForStories);
