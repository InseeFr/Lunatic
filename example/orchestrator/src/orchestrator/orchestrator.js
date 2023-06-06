import React from 'react';
import * as lunatic from '@inseefr/lunatic';

const Orchestrator = ({
	savingType,
	preferences,
	source,
	features,
	pagination = false,
	data,
	management,
	filterDescription,
	suggesters,
	autoSuggesterLoading,
	suggesterFetcher,
}) => {
	const {
		questionnaire,
		components,
		handleChange,
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
		suggesters,
		autoSuggesterLoading,
		suggesterFetcher,
	});

	const Button = lunatic.Button;

	return (
		<div className="container">
			<div className="components">
				{components.map((q) => {
					const { id, componentType } = q;
					const Component = lunatic[componentType];
					return (
						<div className="lunatic-component" key={`component-${id}`}>
							<Component
								{...q}
								handleChange={handleChange}
								labelPosition="TOP"
								preferences={preferences}
								management={management}
								filterDescription={filterDescription}
								features={features}
								bindings={bindings}
								writable
								currentPage={page}
								setPage={setPage}
								flow={flow}
								pagination={pagination}
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
						<div className="btn-page-init">
							<Button
								onClick={() => setPage('1')}
								disabled={isFirstPage}
								value="Page 1"
							/>
						</div>
					</div>
					<div>{`Page : ${page}/${maxPage}`}</div>
				</>
			)}
		</div>
	);
};

export default Orchestrator;
