import { expect, test } from '@playwright/test';

test('can complete pairwise form', async ({ page }) => {
	await page.goto(
		'http://localhost:9999/iframe.html?viewMode=story&id=components-pairwiselinks--default'
	);
	await page.getByLabel('Prénom').nth(2).fill('Marc');
	await page.getByRole('button', { name: 'Ajouter un individu' }).click();
	await page.getByLabel('Prénom').nth(3).fill('Jane');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel('Âge de Jane').click();
	await page.getByLabel('Âge de Jane').fill('20');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByText('Commencez votre saisie...').nth(0).click();
	await page.getByText('Sa mère, son père').click();
	await expect(page.getByText('Sa fille, son fils')).toBeVisible();
	await page.getByText('Sa fille, son fils').isVisible();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await expect(page.getByText('END')).toBeVisible();
	const consoleOut = page.waitForEvent('console');
	await page.getByRole('button', { name: 'Get State' }).click();
	const output = await consoleOut;
	expect(await output.args()[0].jsonValue()).toHaveProperty(
		'COLLECTED.LINKS.COLLECTED',
		[
			[null, '2', null, null],
			['3', null, null, null],
			[null, null, null, null],
			[null, null, null, null],
		]
	);
});
