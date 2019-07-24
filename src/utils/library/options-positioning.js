export const getItemsPositioningClass = positioning => {
	switch (positioning) {
		case 'HORIZONTAL':
			return 'horizontal-options';
		case 'VERTICAL':
		default:
			return '';
	}
};
