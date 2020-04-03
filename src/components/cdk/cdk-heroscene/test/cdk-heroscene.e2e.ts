import { newE2EPage } from '@stencil/core/testing';

describe('cdk-heroscene', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-heroscene></correos-cdk-heroscene>');
		const element = await page.find('correos-cdk-heroscene');
		expect(element).toHaveClass('hydrated');
	});
});
