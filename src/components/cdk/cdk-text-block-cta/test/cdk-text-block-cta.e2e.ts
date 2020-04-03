import { newE2EPage } from '@stencil/core/testing';

describe('cdk-text-block-cta', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-text-block-cta></correos-cdk-text-block-cta>');
		const element = await page.find('correos-cdk-text-block-cta');
		expect(element).toHaveClass('hydrated');
	});
});
