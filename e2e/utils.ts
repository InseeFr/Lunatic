import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Go to a specific story (the storybook iframe)
 */
export async function goToStory(page: Page, storyId: string) {
	await page.goto(
		`http://localhost:9999/iframe.html?viewMode=story&id=${storyId}`
	);
}

/**
 * Go to the next page
 */
export async function gotoNextPage(page: Page, n = 1) {
	for (let i = 0; i < n; i++) {
		await page.getByRole('button', { name: 'Next' }).click();
	}
}

/**
 * Check the output of getData() from lunatic
 */
export async function expectLunaticData(
	page: Page,
	propertyPath: string,
	expected: unknown
) {
	const consoleOut = page.waitForEvent('console');
	await page.getByRole('button', { name: 'Get Data' }).click();
	const output = await consoleOut;
	expect(await output.args()[0].jsonValue()).toHaveProperty(
		propertyPath,
		expected
	);
}
