/**
 * Wrap a callback calling preventDefault and stopPropagation on the event before passing it
 */
export function prevent<
	T extends {
		preventDefault: () => void;
		stopPropagation: () => void;
	}
>(cb?: (e: T) => void): undefined | ((e: T) => void) {
	if (!cb) {
		return undefined;
	}
	return (e) => {
		e.preventDefault();
		e.stopPropagation();
		cb(e);
	};
}

/**
 * Check if an event is within a rectangle
 */
export function isEventInRect(
	event: { clientX: number; clientY: number },
	rect: DOMRect
): boolean {
	return (
		rect.top <= event.clientY &&
		event.clientY <= rect.top + rect.height &&
		rect.left <= event.clientX &&
		event.clientX <= rect.left + rect.width
	);
}
