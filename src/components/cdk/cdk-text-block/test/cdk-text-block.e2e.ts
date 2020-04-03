import { newE2EPage } from '@stencil/core/testing';

describe('cdk-text-block', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-text-block></correos-cdk-text-block>');
		const element = await page.find('correos-cdk-text-block');
		expect(element).toHaveClass('hydrated');
	});
});
