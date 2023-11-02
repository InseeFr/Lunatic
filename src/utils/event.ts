import type { KeyboardEvent, KeyboardEventHandler } from 'react';

export function keyHandler<T>(key: string, handler: KeyboardEventHandler<T>) {
	return (e: KeyboardEvent<T>) => {
		console.log(e.key);
		if (e.key !== ' ') {
			return;
		}
		e.stopPropagation();
		e.preventDefault();
		handler(e);
	};
}
