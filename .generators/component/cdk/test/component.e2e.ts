import { newE2EPage } from '@stencil/core/testing';

describe('template-component', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<tag-template-component></tag-template-component>');
		const element = await page.find('tag-template-component');
		expect(element).toHaveClass('hydrated');
	});
});
