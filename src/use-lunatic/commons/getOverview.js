export const overviewWithChildren = (stateOverview) => {
	const wipOverview = stateOverview
		.filter((entry) => entry.type === 'sequence')
		.map((entry) => ({
			lunaticId: entry.id,
			page: entry.page,
			type: entry.type,
			label: entry.evaluatedLabel,
			visible: entry.visible,
			reached: entry.reached,
			children: [],
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
				children: [],
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
