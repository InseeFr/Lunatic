import { describe, expect, it } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MdLabel from './md-label';

function getStringHtmlWithoutId(htmlElement: HTMLElement) {
	return htmlElement.outerHTML.replace(/id="[^"]+"/g, '')
}


describe('md-label', () => {
	it('should handle simple text', () => {
		const obj = render(<MdLabel expression="This **is** a simple test" />);
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
			<MdLabel expression={'This **is** a simple test\non multiple line'} />
		);
		return expect(obj.container).toMatchInlineSnapshot(`
			<div>
			  This 
			  <strong>
			    is
			  </strong>
			   a simple test
			on multiple line
			</div>
		`);
	});
	it('should handle paragraphs break', () => {
		const obj = render(
			<MdLabel
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
	it('should render external link', () => {
		const obj = render(
			<MdLabel
				expression={'This is a [link](https://inseefr.github.io/Lunatic/docs)'}
			/>
		);
		const stringHtmlWithoutId = getStringHtmlWithoutId(obj.container)

		return expect(stringHtmlWithoutId).toMatchInlineSnapshot('"<div>This is a <a href=\\"https://inseefr.github.io/Lunatic/docs\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" >link</a></div>"');
	});

	it('should render external link with tooltip', async () => {
		const { container } = render(
			<MdLabel
				expression={
					"This is a [link](https://inseefr.github.io/Lunatic/docs 'with a tooltip')"
				}
			/>
		);
		const link = screen.getByText('link'); // Get the link element by its text content
		// Simulate hover event
		await userEvent.hover(link);

		let tooltip = null;

		await waitFor(() => {
			tooltip = screen.getByRole('tooltip');
		});
		expect(tooltip).toBeInTheDocument();
		expect(getStringHtmlWithoutId(container)).toMatchInlineSnapshot('"<div>This is a <a href=\\"https://inseefr.github.io/Lunatic/docs\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"  data-tooltip- class=\\"link-md\\">link</a><div  role=\\"tooltip\\" class=\\"react-tooltip core-styles-module_tooltip__3vRRp styles-module_tooltip__mnnfp styles-module_dark__xNqje tooltip-content react-tooltip__place-top core-styles-module_show__Nt9eE react-tooltip__show\\" style=\\"left: 5px; top: -10px;\\">with a tooltip<div class=\\"react-tooltip-arrow core-styles-module_arrow__cvMwQ styles-module_arrow__K0L3T\\" style=\\"left: -1px; bottom: -4px;\\"></div></div></div>"');
	});

	it('should render internal link', () => {
		const obj = render(
			<MdLabel expression={'This is an [internal link](/docs)'} />
		);
		return expect(getStringHtmlWithoutId(obj.container)).toMatchInlineSnapshot('"<div>This is an <a href=\\"/docs\\" >internal link</a></div>"');
	});

	it('should render internal link with tooltip', async () => {
		const { container } = render(
			<MdLabel
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
		expect(getStringHtmlWithoutId(container)).toMatchInlineSnapshot('"<div>This is an <a href=\\"/docs\\"  data-tooltip- class=\\"link-md\\">internal link</a><div  role=\\"tooltip\\" class=\\"react-tooltip core-styles-module_tooltip__3vRRp styles-module_tooltip__mnnfp styles-module_dark__xNqje tooltip-content react-tooltip__place-top core-styles-module_show__Nt9eE react-tooltip__show\\" style=\\"left: 5px; top: -10px;\\">with a tooltip<div class=\\"react-tooltip-arrow core-styles-module_arrow__cvMwQ styles-module_arrow__K0L3T\\" style=\\"left: -1px; bottom: -4px;\\"></div></div></div>"');
	});
});
