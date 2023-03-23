import { renderHook, act } from '@testing-library/react-hooks';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { useOnlineStatus } from './use-online-status';

describe('useOnlineStatus', () => {
	let originalNavigator: Navigator;
	let onlineCallback;
	let offlineCallback;

	beforeEach(() => {
		originalNavigator = window.navigator;
		onlineCallback = vi.fn();
		offlineCallback = vi.fn();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});
	it('should call the online callback if the user is online', () => {
		const onlineCallback = vi.fn();
		const offlineCallback = vi.fn();
		renderHook(() =>
			useOnlineStatus(onlineCallback, offlineCallback, { onLine: true })
		);
		expect(onlineCallback).toHaveBeenCalled();
		expect(offlineCallback).not.toHaveBeenCalled();
	});

	it('should call the offline callback if the user is offline', () => {
		const onlineCallback = vi.fn();
		const offlineCallback = vi.fn();
		renderHook(() =>
			useOnlineStatus(onlineCallback, offlineCallback, { onLine: false })
		);
		expect(offlineCallback).toHaveBeenCalled();
		expect(onlineCallback).not.toHaveBeenCalled();
	});
});
