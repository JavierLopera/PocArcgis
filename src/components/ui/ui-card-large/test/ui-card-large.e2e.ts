import { newE2EPage } from '@stencil/core/testing';

describe('ui-card-large', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-ui-card-large></correos-ui-card-large>');
		const element = await page.find('correos-ui-card-large');
		expect(element).toHaveClass('hydrated');
	});
});
