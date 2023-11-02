<img align="right" src="docs/img/lunatic-logo.png" alt="Lunatic logo"/>

# Lunatic

[![Lunatic CI](https://github.com/InseeFr/Lunatic/actions/workflows/quality.yml/badge.svg)](https://github.com/InseeFr/Lunatic/actions/workflows/quality.yml)
[![npm version](https://badge.fury.io/js/%40inseefr%2Flunatic.svg)](https://badge.fury.io/js/%40inseefr%2Flunatic)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Lunatic&metric=coverage)](https://sonarcloud.io/dashboard?id=InseeFr_Lunatic)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Lunatic&metric=alert_status)](https://sonarcloud.io/dashboard?id=InseeFr_Lunatic)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Lunatic is a front-end library in the form of a React hook and component libraries for generating a questionnaire from the [Lunatic-Model](https://github.com/InseeFr/Lunatic-Model) data format.

- [Storybook v1](https://inseefr.github.io/Lunatic/storybook-0.3.9), branch `v1-main`
- [Storybook 2.7](https://inseefr.github.io/Lunatic/storybook), branch `2.7`
- [Storybook 2.6](https://inseefr.github.io/Lunatic/storybook-beta), branch `2.6`
- [Documentation](https://inseefr.github.io/Lunatic/en/)

## Table of Contents

- [Lunatic](#lunatic)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [The useLunatic Hook](#the-uselunatic-hook)
    - [Components](#components)
  - [Customization](#customization)
  - [Internal Working](#internal-working)
    - [General Functioning](#general-functioning)
    - [Pages and Pager](#pages-and-pager)
    - [VTL Execution](#vtl-execution)
  - [Convention and Best Practices](#convention-and-best-practices)

## Usage

To get started, you need to install Lunatic:

```bash
yarn add @inseefr/lunatic
```

### The useLunatic Hook

Next, wherever you want to display the form, you'll need to use the `useLunatic` hook.

```js
import { useLunatic } from '@inseefr/lunatic';

const obj = useLunatic(source, data, options);
```

This hook takes three parameters:

- The **source**, which is a JSON representation of the [Lunatic-Model](https://github.com/InseeFr/Lunatic-Model).
- The **data**, which contains the initial questionnaire data (can be an empty object).
- An options object to configure the behavior.
  - **features** (default `['VTL', 'MD']`), allows you to define supported functionalities.
  - **preferences** (default `['COLLECTED']`).
  - **onChange** (default `() => {}`), allows you to add logic to apply when an answer is changed (must be memoized as it's used as a dependency in an internal `useCallback`).
  - **management** (default `false`): Not yet implemented, will allow managing multiple states of the same variable (used by recovery positions).
  - **initialPage** (default `'1'`), allows you to define the starting page.
  - **lastReachedPage** (default `undefined`), allows you to define the furthest reached page.
  - **autoSuggesterLoading** (default `false`).
  - **suggesters**.
  - **suggesterFetcher** (default `fetch`), method used to retrieve suggester data.
  - **activeControls** (default `false`), activates data controls.

And it returns an object that allows you to control the questionnaire:

- `getComponents()`, returns the components to display for the current page.
- `goPreviousPage()`, allows you to go to the previous page.
- `goNextPage()`, allows you to go to the next page.
- `goToPage({ page: string })`, allows you to go to an arbitrary page.
- `getErrors()`, returns the errors.
- `getModalErrors()`, returns the errors in modals.
- `getCurrentErrors()`, returns the errors for the current page.
- `pageTag`, a string containing the page number (e.g., 8.1).
- `isFirstPage`.
- `isLastPage`.
- `pager`, an object containing information related to the page.
- `waiting`, indicates waiting for information from a suggester.
- `getData()`, returns the collected data in the questionnaire.
- `loopVariables`, is an array containing the list of variables used for the current loop.

For more information on the types of this return, you can refer to the available types in the [source code](https://github.com/InseeFr/Lunatic/blob/v2-typescript/src/use-lunatic/type.ts#L64-L200). You can also find an example of using the hook in the [Storybook section](https://github.com/InseeFr/Lunatic/blob/v2-develop/src/stories/utils/orchestrator.js#L69-L93).

### Components

To display the questionnaire, start by retrieving the list of components to display using the `getComponents()` method returned by the hook.

Lunatic offers a library of pre-designed components to cover the different types of fields available in questionnaires.

```jsx
import * as lunatic from '@inseefr/lunatic';

function App({ source, data }) {
	const { getComponents, getCurrentErrors, getModalErrors } =
		lunatic.useLunatic(source, data, {});
	const components = getComponents();
	const currentErrors = getCurrentErrors();
	const modalErrors = getModalErrors();

	return (
		<div className="container">
			<LunaticComponents components={components} />
			<lunatic.Modal errors={modalErrors} goNext={goNextPage} />
		</div>
	);
}
```

All the components offered by Lunatic are available in the [src/components](https://github.com/InseeFr/Lunatic/blob/v2-develop/src/components/components.js) folder.

To activate the **autofocus**, you need to pass a key in the `autoFocusKey` property of `LunaticComponents`. As soon as this value changes, the first field is focused (a good solution is to pass the `pageTag` provided by `useLunatic`).

### Workers

#### General

Lunatic uses webWorkers to take the load off the main execution frame (e.g. list search).

Workers are normally installed when the library is installed (postinstall scripts). If this is not the case, you can always manually run the command `npx @inseefr/lunatic workers` to add Lunatic workers to your project.

Lunatic workers are added to the public/workers folder of the current project when the library is installed.

If a new version of Lunatic offers new workers, they will be automatically updated.
This ensures that you always have the right version of workers for the version of Lunatic you're using.

A good practice is to add the public/workers folder to your `.gitignore.`

#### How it works

Workers are loaded into the latest version (version `workersVersion` of package.json) of the public `workers` folder.

It's up to you if you want to load them at runtime from another location.
Simply specify the base url of the workers folder to useLunatic.

For example, if your workers are hosted on the server `http://localhost:9090/static/final-workers`.
We would then have the workers available at the addresses :

- `http://localhost:9090/static/final-workers/lunatic-append-worker-0.3.0-experimental.js`
- `http://localhost:9090/static/final-workers/lunatic-label-worker-0.3.0-experimental.js`
- `http://localhost:9090/static/final-workers/lunatic-searching-worker-0.3.0-experimental.js`

You'll need to specify the `workersBasePath` props in the useLunatic:

```js
const { getComponents } = useLunatic(source, data,
 { features, preferences, ..., workersBasePath: 'http://localhost:9090/static/final-workers' })
```

## Customization

By default, the components offered by Lunatic are quite simple with a minimal style. You can customize the fields with your own CSS, but for more complex cases, you can also replace the basic components using the `custom` property that you can pass when calling `useLunatic`.

```jsx
const custom = {
	Input: MyCustomInput,
	InputNumber: MyCustomInputNumber,
};

function App({ source, data }) {
	const {} = useLunatic(source, data, { custom });

	// ...
}
```

## Internal Working

This section covers the internal working of the `useLunatic()` hook. The goal is to help understand how it operates.

### General Functioning

The hook is based on an [internal state](https://github.com/InseeFr/Lunatic/blob/v2-typescript/src/use-lunatic/type.ts#L64-L200) that is updated through a [reducer](https://reactjs.org/docs/hooks-reference.html#usereducer) system. The [actions](https://github.com/InseeFr/Lunatic/blob/v2-typescript/src/use-lunatic/actions.ts) affecting this state are limited:

- An action `'use-lunatic/on-init'` allows initialization of the state from the data received as a parameter of the hook.
- The actions `'use-lunatic/go-previous'`, `'use-lunatic/go-next'`, and `'use-lunatic/go-to-page'` are called during navigation using the methods returned by the hook.
- The action `use-lunatic/handle-change` is the most important action and is called whenever data is changed in the questionnaire.

All the [reducers corresponding to these actions are available here](https://github.com/InseeFr/Lunatic/blob/v2-develop/src/use-lunatic/reducer/reducer.js). Generally, they are broken down into several methods depending on the part of the state they modify.

### Pages and Pager

At initialization, the questionnaire scenario is modeled as an object which is stored in the state (in the `pages` property). This object is indexed by page number and contains the list of components to display for each page. Combined with the `pager` which contains the state of navigation, this property allows resolving the components to display.

### VTL Execution

Another important point of Lunatic is the execution of VTL expressions which allow making certain properties dynamic (labels, errors, etc.). This filling is done [when the state changes](https://github.com/InseeFr/Lunatic/blob/v2-develop/src/use-lunatic/commons/use-components-from-state.js).

To facilitate expression execution, an `executeExpression()` method is exposed in the Lunatic state. This method is accompanied by an `updateBindings()` method which allows updating internal values. This expression execution system uses a memoization system to not re-execute the same expression multiple times. When the `use-lunatic/handle-change` action is executed, the values ("bindings") are updated to memorize the values associated with the different VTL variables. Similarly, the values of calculated variables on which the modified variable depends are forgotten to refresh the value during the next execution.

## Convention and Best Practices

### Stable Branchs

- Stable branches follow the glob pattern `'2.*'`, like `2.6` or `2.7`.
- We can maintain if needs, the old stable branches
- `main` branch corresponding to the latest release
- `develop` branch is temporarily maintained. (actually `develop` is the `2.7` branch = the future main release)
- `develop` branch will be deleted soon with this new convention

### Commits and feature branches

- Avoid "default" exports as it impairs readability during import.
- Comments in the code should be in English.
- Files containing JSX should use the .jsx (or .tsx) extension.
- Commits follow the specification [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Pull Requests should be prefixed in the same convention as commits:

  - `test(XXX?)`: XXX for adding tests.
  - `feat(XXX?)`: XXX for adding new features.
  - `fix(XXX?)`: XXX for bug fixes.
  - `docs(XXX?)`: XXX for adding documentation.
  - `refactor(XXX?)`: XXX for refactoring that doesn't change functionality.
  - `build(XXX?)`: XXX for changes related to the build process, compilation scripts, etc.
  - `style(XXX?)`: XXX for style modifications.
  - `ci(XXX?)`: XXX for CI modification.
  - `perf(XXX?)`: XXX for performance improvement.
  - `revert(XXX?)`: XXX to revert a previous PR.
  - `chore(XXX?)`: XXX for maintenance tasks or tasks that don't fall into other categories.

- Branches should be prefixed (following the same prefixes as Conventional Commits):
  - `test/XXX`: for adding tests.
  - `feat/XXX`: for adding new features.
  - `fix/XXX`: for bug fixes.
  - `docs/XXX`: for adding documentation.
  - `refactor/XXX`: for refactoring that doesn't change functionality.
  - `build/XXX`: for changes related to the build process, compilation scripts, etc.
  - `style/XXX`: for changes related to code style.
  - `ci/XXX`: for changes related to continuous integration (CI).
  - `perf/XXX`: for performance improvements.
  - `revert/XXX`: to revert a previous PR.
  - `chore/XXX`: for maintenance tasks or tasks that don't fall into other categories.
