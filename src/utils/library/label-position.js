export const getLabelPositionClass = position => {
	switch (position) {
		case 'TOP':
			return 'label-top';
		case 'BOTTOM':
			return 'label-bottom';
		case 'RIGHT':
			return 'label-right';
		default:
			return 'label-left';
	}
};
