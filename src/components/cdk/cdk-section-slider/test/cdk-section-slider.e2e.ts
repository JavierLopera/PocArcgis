import { newE2EPage } from '@stencil/core/testing';

describe('cdk-section-slider', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-section-slider></correos-cdk-section-slider>');
		const element = await page.find('correos-cdk-section-slider');
		expect(element).toHaveClass('hydrated');
	});
});
