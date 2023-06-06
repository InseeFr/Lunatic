export class Logger {
	static info(...args: unknown[]) {
		console.info(...args);
	}

	static error(...args: unknown[]) {
		console.error(...args);
	}

	static log(...args: unknown[]) {
		console.log(...args);
	}

	static warn(...args: unknown[]) {
		console.warn(...args);
	}
}
