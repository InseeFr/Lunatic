# Non-response

To handle non-response, Lunatic allows you to answer `Don't know` or `Refused` about a question.

## How to

Lunatic composants are wrapped to catch the `missing` property.
Any component whose `missing` property is set to `true` will be followed by non-response processing bouttons (the source questionnaire must have been generated via Lunatic-Model and must contain `missingResponse` property).

Moreover, when non-response is allowed for a question, a custom navigation strategy can be injected via the `missingStrategy` property. A function can be passed as property and will be executed when the non-response buttons are clicked.

Non-response buttons can be replaced by valid React components via the `missing-button-dk` and `missing-button-rf` properties, in wich case, the targeted non-response button will encapsulate the component passed in the properties.

## Styles

Lunatic offers basic style for non-response buttons, wich can be overriden by providing rules for following CSS classes :

- missing-wrapper
- missing-component
- missing-buttons
- missing-button
- missing-button-active
- missing-button-dk
- missing-button-dk-active
- missing-button-rf
- missing-button-rf-active

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
