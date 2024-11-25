import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { SearchMinisearch } from './SearchMinisearch';

vi.mock('minisearch', () => {
	return {
		default: vi.fn().mockImplementation(() => ({
			addAll: vi.fn(),
			search: vi.fn(),
		})),
	};
});

vi.mock('./melauto', () => ({
	applyMelauto: vi.fn(),
}));

describe('SearchMinisearch', () => {
	let searchInstance: SearchMinisearch<any>;
	const mockData = [
		{ id: '1', label: 'First Item' },
		{ id: '2', label: 'Second Item' },
	];

	beforeAll(() => {
		searchInstance = new SearchMinisearch({
			name: 'test-suggester',
			fields: [{ name: 'id' }, { name: 'label' }],
			queryParser: {
				type: 'tokenized',
				params: { language: 'English', pattern: '\\w+', min: 1 },
			},
			max: 10,
		});
	});

	afterEach(() => {
		const miniSearchMock = searchInstance.db as any;
		miniSearchMock.addAll.mockClear();
	});

	it('should initialize and index data correctly', async () => {
		await searchInstance.index(mockData);

		// Check if MiniSearch instance was created and indexed
		expect(searchInstance.db).not.toBeNull();
		expect(searchInstance.isIndexed()).toBe(true);

		// Check if addAll was called with the correct data
		expect(searchInstance.db?.addAll).toHaveBeenCalledWith(mockData);
	});

	it('should not re-index if already indexed', async () => {
		searchInstance.indexed = true;
		await searchInstance.index(mockData);

		expect(searchInstance.db?.addAll).not.toHaveBeenCalled();
	});
});
