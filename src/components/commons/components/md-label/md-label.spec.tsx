import { describe, expect, it } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MdLabel from './md-label';

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
		return expect(obj.container).toMatchInlineSnapshot(`
			<div>
			  This is a 
			  <a
			    href="https://inseefr.github.io/Lunatic/docs"
			    id=":r0:"
			    rel="noopener noreferrer"
			    target="_blank"
			  >
			    link
			  </a>
			</div>
		`);
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
		expect(container).toMatchInlineSnapshot(`
			<div>
			  This is a 
			  <a
			    class="link-md"
			    data-tooltip-id="tooltip-:r1:"
			    href="https://inseefr.github.io/Lunatic/docs"
			    id=":r1:"
			    rel="noopener noreferrer"
			    target="_blank"
			  >
			    link
			  </a>
			  <div
			    class="react-tooltip core-styles-module_tooltip__3vRRp styles-module_tooltip__mnnfp styles-module_dark__xNqje tooltip-content react-tooltip__place-top core-styles-module_show__Nt9eE react-tooltip__show"
			    id="tooltip-:r1:"
			    role="tooltip"
			    style="left: 5px; top: -10px;"
			  >
			    with a tooltip
			    <div
			      class="react-tooltip-arrow core-styles-module_arrow__cvMwQ styles-module_arrow__K0L3T"
			      style="left: -1px; bottom: -4px;"
			    />
			  </div>
			</div>
		`);
	});

	it('should render internal link', () => {
		const obj = render(
			<MdLabel expression={'This is an [internal link](/docs)'} />
		);
		return expect(obj.container).toMatchInlineSnapshot(`
			<div>
			  This is an 
			  <a
			    href="/docs"
			    id=":r2:"
			  >
			    internal link
			  </a>
			</div>
		`);
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
		expect(container).toMatchInlineSnapshot(`
			<div>
			  This is an 
			  <a
			    class="link-md"
			    data-tooltip-id="tooltip-:r3:"
			    href="/docs"
			    id=":r3:"
			  >
			    internal link
			  </a>
			  <div
			    class="react-tooltip core-styles-module_tooltip__3vRRp styles-module_tooltip__mnnfp styles-module_dark__xNqje tooltip-content react-tooltip__place-top core-styles-module_show__Nt9eE react-tooltip__show"
			    id="tooltip-:r3:"
			    role="tooltip"
			    style="left: 5px; top: -10px;"
			  >
			    with a tooltip
			    <div
			      class="react-tooltip-arrow core-styles-module_arrow__cvMwQ styles-module_arrow__K0L3T"
			      style="left: -1px; bottom: -4px;"
			    />
			  </div>
			</div>
		`);
	});
});
