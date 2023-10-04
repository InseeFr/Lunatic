export function isTestEnv(): boolean {
	const meta = import.meta as any;
	return meta && meta?.env ? (import.meta as any).env.MODE === 'test' : false;
}
