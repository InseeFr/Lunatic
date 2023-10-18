export function isTestEnv(): boolean {
	return import.meta.env.MODE === 'test';
}
