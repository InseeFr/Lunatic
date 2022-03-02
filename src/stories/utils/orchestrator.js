import React, { memo } from 'react';
import * as lunatic from 'components';
import './custom-lunatic.scss';
import Waiting from './waiting';

function getStoreInfoRequired() {
	return {};
}

function Pager({ goNext, goPrevious, isLast, isFirst, pageTag }) {
	if (isFirst && isLast) {
		return null;
	}
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

const DEFAULT_DATA = {};
const DEFAULT_FEATURES = ['VTL'];

function OrchestratorForStories({
	source,
	data = DEFAULT_DATA,
	management = false,
	modalForControls = false,
	features = DEFAULT_FEATURES,
	bindings: initialBindings,
	initialPage = '6', // ou 1.1 ...
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
		goNext,
		goPrevious,
		handleChange,
		pageTag,
		isFirst,
		isLast,
		executeExpression,
		waiting,
	} = lunatic.useLunatic({
		source,
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
			{
				<Pager
					goNext={goNext}
					goPrevious={goPrevious}
					isLast={isLast}
					isFirst={isFirst}
					pageTag={pageTag}
					maxPage={maxPage}
				/>
			}
			{
				<Waiting status={waiting}>
					<div className="waiting-orchestrator">
						Initialisation des données de suggestion...
					</div>
				</Waiting>
			}
		</div>
	);
}

export default memo(OrchestratorForStories);
