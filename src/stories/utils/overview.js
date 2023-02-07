import { Fragment } from 'react';
import './overview.scss';

const View = ({ key, overviewEntry, goToPage }) => {
	let color = 'green';
	if (!overviewEntry.reached) {
		color = 'grey';
	}
	if (!overviewEntry.visible) {
		color = 'red';
	}
	return (
		<Fragment key={key}>
			<li
				style={{ listStyle: 'none', color: color }}
				onClick={() => goToPage({ page: overviewEntry.page })}
			>
				<div className="row">
					{overviewEntry.page}
					{overviewEntry.label}
				</div>
				{overviewEntry.children.length > 0 && (
					<Overview overview={overviewEntry.children} goToPage={goToPage} />
				)}
			</li>
		</Fragment>
	);
};

export const Overview = ({ overview: stateOverview, goToPage }) => {
	return (
		<ol>
			{stateOverview.map((entry) => (
				<View
					key={`view-${entry.lunaticId}`}
					overviewEntry={entry}
					goToPage={goToPage}
				/>
			))}
		</ol>
	);
};
