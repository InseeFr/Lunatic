export function getWorkerPath(): string {
	if ('LUNATIC_WORKER_PATH' in window) {
		return window.LUNATIC_WORKER_PATH as string;
	}
	return (
		process.env.LUNATIC_LOADER_WORKER_PATH ??
		process.env.REACT_APP_LUNATIC_LOADER_WORKER_PATH ??
		'workers/lunatic-loader-worker-0.1.0.js'
	);
}
