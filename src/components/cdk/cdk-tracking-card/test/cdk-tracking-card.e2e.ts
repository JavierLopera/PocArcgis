import { newE2EPage } from '@stencil/core/testing';

describe('cdk-tracking-card', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-tracking-card></correos-cdk-tracking-card>');
		const element = await page.find('correos-cdk-tracking-card');
		expect(element).toHaveClass('hydrated');
	});
});
