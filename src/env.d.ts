/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly LUNATIC_LOADER_WORKER_PATH: string;
	readonly LUNATIC_SEARCH_WORKER_PATH: string;
	readonly LUNATIC_LABEL_WORKER_PATH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
