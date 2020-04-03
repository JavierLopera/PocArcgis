import { newE2EPage } from '@stencil/core/testing';

describe('cdk-section-box', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-section-box></correos-cdk-section-box>');
		const element = await page.find('correos-cdk-section-box');
		expect(element).toHaveClass('hydrated');
	});
});
