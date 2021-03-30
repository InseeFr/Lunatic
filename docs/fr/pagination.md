# Pagination

## Utilisation

L'ajout des params `pagination` et `initialPage` dans le hook `useLunatic` permet d'activer la pagination ([documentation de `useLunatic`](./utils/hook.md)).

En valorisant `pagination` à `true`, `useLunatic` renvoie de nouvelles props, dont certaines à passer en paramètre des composants.

## Exemple

```javascript
import React from 'react';
import * as lunatic from '@inseefr/lunatic';

const Orchestrator = ({
	source,
	data,
	savingType,
	preferences,
	features,
	management,
	pagination,
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
							// FIX
							disabled={isLastPage}
							value="Previous"
						/>
						<Button
							onClick={goNext}
							// FIX
							disabled={isFirstPage}
							value="Next"
						/>
						<div className="btn-page-init">
							<Button
								onClick={() => setPage('1')}
								// FIX
								disabled={isLastPage}
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
```
