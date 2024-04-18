import { describe, expect, it } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MDLabel } from './MDLabel';

function getStringHtmlWithoutId(htmlElement: HTMLElement) {
	return htmlElement.outerHTML.replace(/id="[^"]+"/g, '');
}

describe('md-label', () => {
	it('should handle simple text', () => {
		const obj = render(<MDLabel expression="This **is** a simple test" />);
		return expect(obj.container).toMatchInlineSnapshot(`
			<div>
			  This 
			  <strong>
			    is
			  </strong>
			   a simple test
			</div>
		`);
	});
	it('should handle line break', () => {
		const obj = render(
			<MDLabel expression={'This **is** a simple test\non multiple line'} />
		);
		return expect(obj.container).toMatchInlineSnapshot(`
			<div>
			  This 
			  <strong>
			    is
			  </strong>
			   a simple test
			  <br />
			  

			  on multiple line
			</div>
		`);
	});
	it('should handle paragraphs break', () => {
		const obj = render(
			<MDLabel
				expression={'This **is** a simple test\n\nwith multiple paragraphs'}
			/>
		);
		return expect(obj.container).toMatchInlineSnapshot(`
			<div>
			  <p>
			    This 
			    <strong>
			      is
			    </strong>
			     a simple test
			  </p>
			  

			  <p>
			    with multiple paragraphs
			  </p>
			</div>
		`);
	});

	it('should handle emoticon', () => {
		const obj = render(<MDLabel expression={'**Demo** of a :dog:'} />);
		return expect(obj.container).toMatchInlineSnapshot(`
			<div>
			  <strong>
			    Demo
			  </strong>
			   of a 
			  <span
			    aria-label="dog emoji"
			    role="img"
			  >
			    🐶
			  </span>
			</div>
		`);
	});

	it('should render external link', () => {
		const obj = render(
			<MDLabel
				expression={'This is a [link](https://inseefr.github.io/Lunatic/docs)'}
			/>
		);
		const stringHtmlWithoutId = getStringHtmlWithoutId(obj.container);

		return expect(stringHtmlWithoutId).toMatchInlineSnapshot(
			`"<div>This is a <a href="https://inseefr.github.io/Lunatic/docs" target="_blank" rel="noopener noreferrer" >link</a></div>"`
		);
	});

	it('should render external link with tooltip', async () => {
		render(
			<MDLabel
				expression={
					"This is a [link](https://inseefr.github.io/Lunatic/docs 'with a tooltip')"
				}
			/>
		);
		const link = screen.getByText('link'); // Get the link element by its text content
		// Simulate hover event
		await userEvent.hover(link);

		let tooltip: HTMLElement | undefined;

		await waitFor(() => {
			tooltip = screen.getByRole('tooltip');
		});
		expect(link.getAttribute('data-tooltip-id')).toBe(tooltip?.id);

		expect(tooltip).toBeInTheDocument();
	});

	it('should render internal link', () => {
		const obj = render(
			<MDLabel expression={'This is an [internal link](/docs)'} />
		);
		return expect(getStringHtmlWithoutId(obj.container)).toMatchInlineSnapshot(
			`"<div>This is an <a href="/docs" >internal link</a></div>"`
		);
	});

	it('should render internal link with tooltip', async () => {
		render(
			<MDLabel
				expression={"This is an [internal link](/docs 'with a tooltip')"}
			/>
		);

		const link = screen.getByText('internal link'); // Get the link element by its text content
		// Simulate hover event
		await userEvent.hover(link);

		let tooltip = null;

		await waitFor(() => {
			tooltip = screen.getByRole('tooltip');
		});
		expect(tooltip).toBeInTheDocument();
	});
});
