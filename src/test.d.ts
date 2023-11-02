import 'vitest';
import { TestingLibraryMatchers } from 'vitest-dom/matchers';

declare global {
	namespace Vi {
		interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
	}
}
