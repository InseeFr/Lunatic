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
	let color = 'grey';
	if (overviewEntry.reached) {
		color = 'var(--color-primary-main)';
	}
	if (overviewEntry.current) {
		color = 'green';
	}
	return (
		<Fragment>
			<li style={{ color: color }}>
				<div onClick={() => goToPage({ page: overviewEntry.page })}>
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
