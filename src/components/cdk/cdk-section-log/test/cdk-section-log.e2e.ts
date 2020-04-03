import { newE2EPage } from '@stencil/core/testing';

describe('cdk-section-log', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-section-log></correos-cdk-section-log>');
		const element = await page.find('correos-cdk-section-log');
		expect(element).toHaveClass('hydrated');
	});
});
