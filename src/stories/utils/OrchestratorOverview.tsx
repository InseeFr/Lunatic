import type { InterpretedLunaticOverviewItem } from '../../use-lunatic/hooks/useOverview';
import type { useLunatic } from '../../use-lunatic/use-lunatic';

type Props = {
	overview: InterpretedLunaticOverviewItem[];
	goToPage: ReturnType<typeof useLunatic>['goToPage'];
	depth?: number;
};

export const OrchestratorOverview = ({
	overview: stateOverview,
	goToPage,
	depth = 0,
}: Props) => {
	return (
		<div>
			{depth === 0 && <h3 className="text-lg font-bold mb-2">Overview</h3>}
			<ol style={{ paddingLeft: `${depth * 1.25}rem` }}>
				{stateOverview.map((entry) => (
					<OverviewItem
						key={`view-${entry.id}-${entry.page}`}
						overviewEntry={entry}
						goToPage={goToPage}
						depth={depth}
					/>
				))}
			</ol>
		</div>
	);
};

type OverviewItemProps = {
	overviewEntry: InterpretedLunaticOverviewItem;
	goToPage: Props['goToPage'];
	depth: number;
};

const OverviewItem = ({
	overviewEntry,
	goToPage,
	depth,
}: OverviewItemProps) => {
	let color = 'text-base-content/50';
	if (overviewEntry.reached) {
		color = 'text-base-content';
	}
	if (overviewEntry.current) {
		color = 'text-success';
	}
	return (
		<li className={`${color}`}>
			<button
				style={{ display: 'contents' }}
				onClick={() => goToPage({ page: overviewEntry.page })}
			>
				<div className="flex">
					<span>{overviewEntry.label}</span>
					<span className="dot-leader">{overviewEntry.page}</span>
				</div>
			</button>
			{overviewEntry.children.length > 0 && (
				<OrchestratorOverview
					overview={overviewEntry.children}
					goToPage={goToPage}
					depth={depth + 1}
				/>
			)}
		</li>
	);
};
