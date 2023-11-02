export function isTestEnv(): boolean {
	try {
		// using vitest, process.env is defined
		return /test/.test(`${process.env.npm_lifecycle_event}`);
	} catch (e) {
		// process.env is not defined
		// so we are not running as test so we can return false
		// process.env is not defined during storybook running/
		return false;
	}
}
