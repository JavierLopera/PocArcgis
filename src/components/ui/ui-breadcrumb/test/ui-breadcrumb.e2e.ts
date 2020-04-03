import { newE2EPage } from '@stencil/core/testing';

describe('ui-breadcrumb', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-ui-breadcrumb></correos-ui-breadcrumb>');
		const element = await page.find('correos-ui-breadcrumb');
		expect(element).toHaveClass('hydrated');
	});
});
