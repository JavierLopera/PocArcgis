import { newE2EPage } from '@stencil/core/testing';

describe('ui-input', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-ui-input></correos-ui-input>');
		const element = await page.find('correos-ui-input');
		expect(element).toHaveClass('hydrated');
	});
});
