import { userEvent, waitFor, within } from '@storybook/testing-library';
import { sleep } from './timer';
import { expect } from '@storybook/jest';

/**
 * Bridge between playwright tests and storybook tests
 * This is used to have a similar API for both tests
 */
export function playwrightToUserEvent(canvas) {
	return new Page(canvas);
}

class Page {
	/**
	 * @param {HTMLElement} canvas
	 */
	constructor(canvas) {
		this.canvas = within(canvas);
	}

	getByRole(...args) {
		return new Instruction(this.canvas.findByRole(...args));
	}

	getByText(...args) {
		if (args[1] && args[1].index !== undefined) {
			const index = args[1].index;
			return new Instruction(
				this.canvas.findAllByText(...args).then((r) => r[index])
			);
		}
		return new Instruction(this.canvas.findByText(...args));
	}

	getByLabel(...args) {
		if (args[1] && args[1].index !== undefined) {
			const index = args[1].index;
			return new Instruction(
				this.canvas.findAllByLabelText(...args).then((r) => r[index])
			);
		}
		return new Instruction(this.canvas.findByLabelText(...args));
	}
}

class Instruction {
	constructor(element) {
		if (element instanceof Error) {
			throw element;
		}
		this.element = element;
	}

	async shouldBeVisible() {
		return waitFor(async () => expect(await this.element).toBeVisible());
	}

	locator(selector) {
		return new Instruction(this.element.then((b) => b.querySelector(selector)));
	}

	getByRole(...args) {
		return new Instruction(
			this.element.then((b) => within(b).findByRole(...args))
		);
	}

	getByText(...args) {
		return new Instruction(
			this.element.then((b) => within(b).findByText(...args))
		);
	}

	async click() {
		return userEvent.click(await this.element);
	}

	async fill(text) {
		const element = await this.element;
		await userEvent.clear(element);
		await sleep(1);
		return userEvent.type(element, text, { delay: 1 });
	}
}
