export function isTestEnv(): boolean {
	// @ts-ignore
	return import.meta.env.MODE === 'test';
}
