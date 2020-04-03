import { newE2EPage } from '@stencil/core/testing';

describe('ui-button', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-ui-button></correos-ui-button>');
		const element = await page.find('correos-ui-button');
		expect(element).toHaveClass('hydrated');
	});
});
