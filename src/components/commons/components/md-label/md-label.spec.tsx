import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
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
});
