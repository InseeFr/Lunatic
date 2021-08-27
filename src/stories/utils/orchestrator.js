import React from 'react';
import * as lunatic from 'components';
import './custom-lunatic.scss';

function getStoreInfoRequired() {
	return {};
}

const OrchestratorForStories = ({
	source,
	data = {},
	management = false,
	pagination = false,
	features,
	bindings: initialBindings,
	initialPage = '1',
	getStoreInfo = getStoreInfoRequired,
	missing = false,
	shortcut = false,
	activeGoNextForMissing = false,
	suggesterFetcher,
	autoSuggesterLoading,
	...rest
}) => {
	const preferences = management
		? ['COLLECTED', 'FORCED', 'EDITED']
		: ['COLLECTED'];
	const savingType = management ? 'EDITED' : 'COLLECTED';
	const {
		handleChange,
		components,
		bindings,
		pagination: {
			goNext,
			goPrevious,
			page,
			setPage,
			maxPage,
			isFirstPage,
			isLastPage,
			flow,
		},
	} = lunatic.useLunatic(source, data, {
		savingType,
		preferences,
		features,
		management,
		pagination,
		initialPage,
		suggesterFetcher,
		autoSuggesterLoading,
	});
	const Button = lunatic.Button;

	const missingStrategy = (b) => goNext(null, b);

	return (
		<div className="container">
			<div className="components">
				{components.map((q) => {
					const { id, componentType } = q;
					const Component = lunatic[componentType];
					const { storeName } = q;

					return (
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								{...rest}
								{...q}
								{...getStoreInfo(storeName)}
								handleChange={handleChange}
								preferences={preferences}
								savingType={savingType}
								management={management}
								features={features}
								bindings={{ ...bindings, ...initialBindings }}
								currentPage={page}
								setPage={setPage}
								flow={flow}
								pagination={pagination}
								missing={missing}
								shortcut={shortcut}
								missingStrategy={activeGoNextForMissing && missingStrategy}
							/>
						</div>
					);
				})}
			</div>
			{pagination && (
				<>
					<div className="pagination">
						<Button
							onClick={goPrevious}
							disabled={isFirstPage}
							value="Previous"
						/>
						<Button onClick={goNext} disabled={isLastPage} value="Next" />
					</div>
					<div>{`Page : ${page}/${maxPage}`}</div>
				</>
			)}
		</div>
	);
};

export default OrchestratorForStories;
