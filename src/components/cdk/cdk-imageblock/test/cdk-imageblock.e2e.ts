import { newE2EPage } from '@stencil/core/testing';

describe('cdk-imageblock', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-imageblock></correos-cdk-imageblock>');
		const element = await page.find('correos-cdk-imageblock');
		expect(element).toHaveClass('hydrated');
	});
});
