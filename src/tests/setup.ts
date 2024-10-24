import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();
});

// Mock for structuredClone on NodeJS
(global as any).structuredClone = (val: any) => {
	return JSON.parse(JSON.stringify(val));
};

// We need ResizeObserver to test Tooltip
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));
