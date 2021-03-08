import React from 'react';
import * as lunatic from 'components';
import './custom-lunatic.scss';

const OrchestratorForStories = ({
	source,
	data = {},
	management = false,
	pagination = false,
	features,
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
			maxPage,
			disabledNext,
			disabledPrevious,
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
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								{...rest}
								{...q}
								handleChange={handleChange}
								preferences={preferences}
								management={management}
								features={features}
								bindings={bindings}
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
							disabled={disabledPrevious}
							value="Previous"
						/>
						<Button onClick={goNext} disabled={disabledNext} value="Next" />
					</div>
					<div>{`Page : ${page}/${maxPage}`}</div>
				</>
			)}
		</div>
	);
};

export default OrchestratorForStories;
