export const getLabelPositionClass = (position) => {
	switch (position) {
		case 'LEFT':
			return 'label-left';
		case 'BOTTOM':
			return 'label-bottom';
		case 'RIGHT':
			return 'label-right';
		default:
			return 'label-top';
	}
};
