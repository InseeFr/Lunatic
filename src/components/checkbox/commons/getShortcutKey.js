import { alphabet } from '../../../utils/constants/alphabet';

export const getShortcutKey = (currentIndex, maxIndex) =>
	maxIndex < 10 ? `${currentIndex + 1}` : alphabet[currentIndex];
