import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import MdLabel from './md-label';

describe('md-label', () => {
	it('should handle emoticon', () => {
		const obj = render(<MdLabel expression="**Demo** of a :dog:" />);
		return expect(obj.container.firstChild).toMatchInlineSnapshot(`
			<p>
			  <strong>
			    Demo
			  </strong>
			   of a 
			  🐶
			</p>
		`);
	});
});
