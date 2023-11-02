import packageInfo from '../../../package.json';

export enum WorkerEnum {
	APPEND = 'APPEND',
	SEARCH = 'SEARCH',
	LABEL = 'LABEL',
}

const version = packageInfo.workersVersion;

const DEFAULT_BASE_PATH = 'workers';
const WORKER_PATH = {
	APPEND: `lunatic-append-worker-${version}.js`,
	SEARCH: `lunatic-search-worker-${version}.js`,
	LABEL: `lunatic-label-worker-${version}.js`,
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
