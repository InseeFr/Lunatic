export const getItemsPositioningClass = positioning => {
	switch (positioning) {
		case 'HORIZONTAL':
			return 'horizontal-items';
		case 'VERTICAL':
		default:
			return '';
	}
};
