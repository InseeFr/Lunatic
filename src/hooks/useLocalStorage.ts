import { useCallback, useMemo, useState } from 'react';

export function useLocalStorage<T>(
	key: string
): [T | null, (value: string) => void, string] {
	const [storedValue, setStoredValue] = useState<T | null>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return null;
		}
	});

	const setValue = useCallback(
		(value: string) => {
			try {
				const parsedValue = JSON.parse(value);
				setStoredValue(parsedValue);
				window.localStorage.setItem(key, value);
			} catch (error) {
				console.error(`Error setting localStorage key "${key}":`, error);
			}
		},
		[key]
	);

	const stringValue = useMemo(() => {
		if (!storedValue) {
			return '';
		}
		return JSON.stringify(storedValue, null, 2);
	}, [storedValue]);

	return [storedValue, setValue, stringValue];
}
