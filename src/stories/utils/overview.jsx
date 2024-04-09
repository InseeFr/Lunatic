import { Fragment } from 'react';
import './overview.scss';

export const Overview = ({ overview: stateOverview, goToPage }) => {
	return (
		<ol className="orchestrator-overview">
			{stateOverview.map((entry) => (
				<OverviewItem
					key={`view-${entry.id}-${entry.page}`}
					overviewEntry={entry}
					goToPage={goToPage}
				/>
			))}
		</ol>
	);
};

const OverviewItem = ({ overviewEntry, goToPage }) => {
	let color = 'green';
	if (!overviewEntry.reached) {
		color = 'grey';
	}
	return (
		<Fragment>
			<li
				style={{ color: color }}
				onClick={() => goToPage({ page: overviewEntry.page })}
			>
				<div>
					<span>{overviewEntry.label}</span>
					<span>({overviewEntry.page})</span>
				</div>
				{overviewEntry.children.length > 0 && (
					<Overview overview={overviewEntry.children} goToPage={goToPage} />
				)}
			</li>
		</Fragment>
	);
};
