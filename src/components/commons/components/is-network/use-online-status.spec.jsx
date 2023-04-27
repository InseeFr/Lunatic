import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import useOnlineStatus from './use-online-status';

describe('useOnlineStatus', () => {
	let originalNavigator;
	let onlineCallback;
	let offlineCallback;

	beforeEach(() => {
		originalNavigator = window.navigator;
		onlineCallback = vi.fn();
		offlineCallback = vi.fn();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		window.navigator = originalNavigator;
	});
	it('should call the online callback if the user is online', () => {
		const onlineCallback = vi.fn();
		const offlineCallback = vi.fn();
		window.navigator.__defineGetter__('onLine', () => true);
		renderHook(() => useOnlineStatus(onlineCallback, offlineCallback));
		expect(onlineCallback).toHaveBeenCalled();
		expect(offlineCallback).not.toHaveBeenCalled();
	});

	it('should call the offline callback if the user is offline', () => {
		const onlineCallback = vi.fn();
		const offlineCallback = vi.fn();
		window.navigator.__defineGetter__('onLine', () => false);
		renderHook(() => useOnlineStatus(onlineCallback, offlineCallback));
		expect(offlineCallback).toHaveBeenCalled();
		expect(onlineCallback).not.toHaveBeenCalled();
	});
});
