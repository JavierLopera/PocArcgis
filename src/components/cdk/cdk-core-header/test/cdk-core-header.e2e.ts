import { newE2EPage } from '@stencil/core/testing';

describe('cdk-core-header', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-core-header></correos-cdk-core-header>');
		const element = await page.find('correos-cdk-core-header');
		expect(element).toHaveClass('hydrated');
	});
});
