import { newE2EPage } from '@stencil/core/testing';

describe('cdk-map', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-map></correos-cdk-map>');
		const element = await page.find('correos-cdk-map');
		expect(element).toHaveClass('hydrated');
	});
});
