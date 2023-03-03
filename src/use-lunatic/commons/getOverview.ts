import { LunaticState } from '../type';

type OverviewItem = {
	lunaticId: string;
	page: string;
	type: string;
	label: string;
	visible: boolean;
	reached: boolean;
	children: OverviewItem[];
};

export const overviewWithChildren = (
	stateOverview: LunaticState['overview']
) => {
	const wipOverview = stateOverview
		.filter((entry) => entry.type === 'sequence')
		.map((entry) => ({
			lunaticId: entry.id,
			page: entry.page,
			type: entry.type,
			label: entry.evaluatedLabel,
			visible: entry.visible,
			reached: entry.reached,
			children: [] as OverviewItem[],
		}));

	stateOverview
		.filter((entry) => entry.type === 'subSequence')
		.forEach((subSeq) => {
			const subEntry = {
				lunaticId: subSeq.id,
				page: subSeq.page,
				type: subSeq.type,
				label: subSeq.evaluatedLabel,
				visible: subSeq.visible,
				reached: subSeq.reached,
				children: [] as OverviewItem[],
			};
			wipOverview.map((seq) => {
				if (seq.page === subSeq.parent) {
					return { ...seq, children: seq.children.push(subEntry) };
				}
				return seq;
			});
		});
	return wipOverview;
};
