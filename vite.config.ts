/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	envPrefix: ['VITE_', 'LUNATIC_'],
	plugins: [react()],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		setupFiles: ['./tests/setup.ts'],
	},
});
