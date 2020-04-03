import { newE2EPage } from '@stencil/core/testing';

describe('ui-icon-button', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-ui-icon-button></correos-ui-icon-button>');
		const element = await page.find('correos-ui-icon-button');
		expect(element).toHaveClass('hydrated');
	});
});
