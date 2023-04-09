import React from 'react';
import { render, screen } from '@testing-library/react';
import IsNetwork from './is-network';
import { expect, describe, it, vi, afterEach, beforeEach } from 'vitest';

describe('IsNetwork', () => {
	let originalNavigator: Navigator;
	beforeEach(() => {
		originalNavigator = window.navigator;
	});
	afterEach(() => {
		vi.restoreAllMocks();
		(window as any).navigator = originalNavigator;
	});
	it('renders the component', () => {
		render(<IsNetwork />);
		const component = screen.getByTitle(/network on/i);
		expect(component).toBeInTheDocument();
	});

	it('displays "Network on" when online', () => {
		render(<IsNetwork />);
		const component = screen.getByTitle(/network on/i);
		expect(component).toBeInTheDocument();
	});

	it('displays "Network off" when offline', () => {
		vi.spyOn(window.navigator, 'onLine', 'get').mockReturnValue(false);
		render(<IsNetwork />);
		const component = screen.getByTitle(/network off/i);
		expect(component).toBeInTheDocument();
	});
});
