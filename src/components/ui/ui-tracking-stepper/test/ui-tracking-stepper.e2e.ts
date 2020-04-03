import { newE2EPage } from '@stencil/core/testing';

describe('ui-tracking-stepper', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<correos-ui-tracking-stepper></correos-ui-tracking-stepper>');
		const element = await page.find('correos-ui-tracking-stepper');
		expect(element).toHaveClass('hydrated');
	});
});
