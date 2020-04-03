import { newE2EPage } from '@stencil/core/testing';

describe('ui-card', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-ui-card></correos-ui-card>');
		const element = await page.find('correos-ui-card');
		expect(element).toHaveClass('hydrated');
	});
});
