import { newE2EPage } from '@stencil/core/testing';

describe('cdk-tarificador', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-cdk-tarificador></correos-cdk-tarificador>');
		const element = await page.find('correos-cdk-tarificador');
		expect(element).toHaveClass('hydrated');
	});
});
