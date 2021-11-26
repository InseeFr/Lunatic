import React, { useEffect, useState } from 'react';
import * as lunatic from 'components';
import './custom-lunatic.scss';

function getStoreInfoRequired() {
	return {};
}

// function useQuestionnaire(source, data) {
// 	const [questionnaire, setQuestionnaire] = useState({});

// 	useEffect(
// 		function () {
// 			setQuestionnaire({ ...source, ...data });
// 		},
// 		[source, data]
// 	);

// 	function handleChange(update) {
// 		console.log({ update });
// 	}

// 	return [questionnaire, handleChange];
// }

const OrchestratorForStories = ({
	source,
	suggesters,
	data = {},
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
	/* */
	const { questionnaire, handleChange, bindings } = lunatic.useQuestionnaire(
		source,
		data
	);
	const { getComponents, page } = lunatic.usePagination(questionnaire);
	const components = getComponents();

	return (
		<div className="container">
			<div className="components">
				{components.map(function (component) {
					const { id, componentType, name } = component;
					const Component = lunatic[componentType];

					return (
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								{...rest}
								{...component}
								handleChange={handleChange}
								preferences={preferences}
								savingType={savingType}
								management={management}
								features={features}
								bindings={bindings}
								currentPage={page}
								pagination={pagination}
								missing={missing}
								shortcut={shortcut}
								missingStrategy={activeGoNextForMissing && missingStrategy}
							/>
						</div>
					);
				})}
			</div>
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

export default OrchestratorForStories;
