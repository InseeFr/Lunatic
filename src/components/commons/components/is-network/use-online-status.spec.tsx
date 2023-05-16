import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useOnlineStatus from './use-online-status';

describe('useOnlineStatus', () => {
	let originalNavigator: Navigator;

	beforeEach(() => {
		originalNavigator = window.navigator;
	});

	afterEach(() => {
		vi.restoreAllMocks();
		(window as any).navigator = originalNavigator;
	});
	it('should call the online callback if the user is online', () => {
		const onlineCallback = vi.fn();
		const offlineCallback = vi.fn();
		(window as any).navigator.__defineGetter__('onLine', () => true);
		renderHook(() => useOnlineStatus(onlineCallback, offlineCallback));
		expect(onlineCallback).toHaveBeenCalled();
		expect(offlineCallback).not.toHaveBeenCalled();
	});

	it('should call the offline callback if the user is offline', () => {
		const onlineCallback = vi.fn();
		const offlineCallback = vi.fn();
		(window as any).navigator.__defineGetter__('onLine', () => false);
		renderHook(() => useOnlineStatus(onlineCallback, offlineCallback));
		expect(offlineCallback).toHaveBeenCalled();
		expect(onlineCallback).not.toHaveBeenCalled();
	});
});
