# Non réponse

Afin de pouvoir gérer la non réponse, Lunatic permet de répondre `Ne sais pas` ou `Refus` au sujet d'une question.

## Fonctionnement

Les composants de Lunatic sont wrappés pour intercepter la props `missing`.
Tout composant ayant la props `missing` à `true` sera donc succédé des bouttons permettant de traiter la non réponse (le questionnaire source doit alors être généré via Lunatic Model en contenant les attributs `missingResponse`)

De plus, lors de la déclaration de la non réponse pour une question, une stratégie personnelle de navigation peut être injectée via la props `missingStrategy`. Une fonction peut alors être passée en paramètre et sera executée lors des clics sur ces boutons.

## Example

```javascript
import React from 'react';
import * as lunatic from 'components';

const OrchestratorForStories = ({ source, data = {}, ...rest }) => {
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
		savingType: 'COLLECTED',
		preferences: ['COLLECTED'],
		features,
		pagination: true,
	});
	const Button = lunatic.Button;

	const missingStrategy = (b) => goNext(null, b);

	return (
		<div className="container">
			<div className="components">
				{components.map((q) => {
					const { id, componentType } = q;
					const Component = lunatic[componentType];
					return (
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								{...rest}
								{...q}
								handleChange={handleChange}
								preferences={preferences}
								savingType={savingType}
								features={features}
								bindings={bindings}
								currentPage={page}
								setPage={setPage}
								flow={flow}
								pagination
								missing
								missingStrategy={missingStrategy}
							/>
						</div>
					);
				})}
			</div>
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
		</div>
	);
};

export default OrchestratorForStories;
```
