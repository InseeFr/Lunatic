import React, { memo } from 'react';
import * as lunatic from 'components';
import './custom-lunatic.scss';

function getStoreInfoRequired() {
	return {};
}

function Pager({ goNext, goPrevious, isLast, isFirst, pageTag }) {
	const Button = lunatic.Button;
	return (
		<>
			<div className="pagination">
				<Button onClick={goPrevious} disabled={isFirst} value="Previous" />
				<Button onClick={goNext} disabled={isLast} value="Next" />
			</div>

			<div>PAGE: {pageTag}</div>
		</>
	);
}

// function LunaticComponent(){
// 	  const { id, componentType } = component;
// 	const Component = lunatic[componentType];
// 	return (
// 		<div className="lunatic lunatic-component" key={`component-${id}`}>
// 			<Component
// 				{...rest}
// 				{...component}
// 				handleChange={(...args) => handleChange(...args, component)}
// 				preferences={preferences}
// 				savingType={savingType}
// 				management={management}
// 				features={features}
// 				bindings={bindings}
// 				pagination={pagination}
// 				missing={missing}
// 				shortcut={shortcut}
// 			/>
// 		</div>
// 	);
// }

const DEFAULT_DATA = {};
const OrchestratorForStories = ({
	source,
	suggesters,
	data = DEFAULT_DATA,
	management = false,
	pagination = false,
	modalForControls = false,
	features = ['VTL'],
	bindings: initialBindings,
	initialPage = '1',
	getStoreInfo = getStoreInfoRequired,
	missing = false,
	shortcut = false,
	activeGoNextForMissing = false,
	suggesterFetcher,
	autoSuggesterLoading,
	addExternal,
	...rest
}) => {
	const preferences = management
		? ['COLLECTED', 'FORCED', 'EDITED']
		: ['COLLECTED'];
	const savingType = management ? 'EDITED' : 'COLLECTED';

	const {
		getComponents,
		goNextPage,
		goPreviousPage,
		handleChange,
		bindings,
		pageTag,
		isFirstPage,
		isLastPage,
	} = lunatic.useLunatic({
		source,
		data,
		initialPage,
	});

	const components = getComponents();
	return (
		<div className="container">
			<div className="components">
				{components.map(function (component) {
					const { id, componentType } = component;
					const Component = lunatic[componentType];
					return (
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								{...rest}
								{...component}
								handleChange={(...args) => handleChange(...args, component)}
								preferences={preferences}
								savingType={savingType}
								management={management}
								features={features}
								bindings={bindings}
								pagination={pagination}
								missing={missing}
								shortcut={shortcut}
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
			/>
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
};

export default memo(OrchestratorForStories);
