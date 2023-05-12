import { alphabet } from '../../../utils/constants/alphabet';

export const getShortcutKey = (
	currentIndex: number,
	maxIndex: number
): string => (maxIndex < 10 ? `${currentIndex + 1}` : alphabet[currentIndex]);
