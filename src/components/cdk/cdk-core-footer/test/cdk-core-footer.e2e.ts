import { newE2EPage } from '@stencil/core/testing';

describe('cdk-core-footer', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-core-footer></correos-cdk-core-footer>');
		const element = await page.find('correos-cdk-core-footer');
		expect(element).toHaveClass('hydrated');
	});
});
