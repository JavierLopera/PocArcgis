import { newE2EPage } from '@stencil/core/testing';

describe('cdk-section-bgimagecard', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-section-bgimagecard></correos-cdk-section-bgimagecard>');
		const element = await page.find('correos-cdk-section-bgimagecard');
		expect(element).toHaveClass('hydrated');
	});
});
