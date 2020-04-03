import { newE2EPage } from '@stencil/core/testing';

describe('cdk-shipping-card', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-shipping-card></correos-cdk-shipping-card>');
		const element = await page.find('correos-cdk-shipping-card');
		expect(element).toHaveClass('hydrated');
	});
});
