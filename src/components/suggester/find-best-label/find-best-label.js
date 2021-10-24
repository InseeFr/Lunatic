const WORKER_PATH =
	process.env.LUNATIC_LABEL_WORKER_PATH ||
	process.env.REACT_APP_LUNATIC_LABEL_WORKER_PATH;

let WORKER;
const TASKS = new Map();

function getIdTask() {
	const id = `${Date.now()}`;
	if (id in TASKS) {
		return getIdTask();
	}
	return id;
}

function getWorker() {
	if (!WORKER) {
		WORKER = new Worker(WORKER_PATH);
		WORKER.addEventListener('message', function (e) {
			const { data } = e;
			const { response, idTask } = data;
			if (idTask in TASKS) {
				TASKS[idTask](response);
			}
		});
	}
	return WORKER;
}

/**
 *
 * @param {*} option
 * @param {*} search
 * @returns
 */
function findBestLabel(option, search) {
	return new Promise(function (resolve) {
		const idTask = getIdTask();
		const worker = getWorker();

		TASKS[idTask] = function (response) {
			resolve(response);
			delete TASKS[idTask];
		};
		worker.postMessage({ option, search, idTask });
	});
}

export default findBestLabel;
