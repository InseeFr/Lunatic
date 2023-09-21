export function isTestEnv(): boolean {
	return import.meta ? (import.meta as any).env.MODE === 'test' : false;
}
