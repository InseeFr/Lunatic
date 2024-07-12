import type { LunaticLogger } from './type';

/**
 * Default logger
 */
export const ConsoleLogger: LunaticLogger = (msg) => {
	if (msg.type === 'ERROR') {
		console.error(msg.error);
	}
	if (msg.type === 'WARNING') {
		console.warn(msg.message);
	}
};
