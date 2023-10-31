import packageInfo from '../../../package.json';

export enum WorkerEnum {
	LOADER = 'LOADER',
	SEARCH = 'SEARCH',
	LABEL = 'LABEL',
}

const DEFAULT_BASE_PATH = 'workers';
const WORKER_PATH = {
	LOADER: `lunatic-append-worker-${packageInfo.workersVersion}.js`,
	SEARCH: `lunatic-searching-worker-${packageInfo.workersVersion}.js`,
	LABEL: `lunatic-label-worker-${packageInfo.workersVersion}.js`,
};

export function getWorkerPath(
	workerType: WorkerEnum,
	workersBasePath?: string
): string {
	if (workersBasePath) {
		return `${workersBasePath}/${WORKER_PATH[workerType]}`;
	} else {
		return `${DEFAULT_BASE_PATH}/${WORKER_PATH[workerType]}`;
	}
}
