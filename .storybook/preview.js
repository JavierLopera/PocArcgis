import { configure, addParameters, addDecorator, setCustomElements } from '@storybook/web-components';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import customElements from '../.stencil/custom-elements.json';
import withAssets from './stencil-integration/stencil';

addParameters({
	a11y: {
		config: {},
		options: {
			checks: { 'color-contrast': { options: { noScroll: true } } },
			restoreScroll: true,
		},
	},
	docs: {
		iframeHeight: '200px',
	},
	viewport: { viewports: {
			mobile: {
				name: 'mobile',
				styles: {
					width: '360px',
					height: '640px',
				},
			},
			mobileLarge: {
				name: 'mobile-large',
				styles: {
					width: '414px',
					height: '736px',
				},
			},
			tablet: {
				name: 'tablet',
				styles: {
					width: '768px',
					height: '1024px',
				},
			},
			tabletLarge: {
				name: 'tablet-large',
				styles: {
					width: '1024px',
					height: '1366px',
				},
			},
			desktop: {
				name: 'desktop',
				styles: {
					width: '1366px',
					height: '768px',
				},
			},
			desktopLarge: {
				name: 'desktop-large',
				styles: {
					width: '1920px',
					height: '1080px',
				},
			}
		}
	},
});

addDecorator(withKnobs);
addDecorator(withA11y);

/**
 * Load webcomponents props
 */
setCustomElements(customElements);

/**
 * Add custom with assets decorator
 */
addDecorator(withAssets({
	// Add addtional key value pair assets.
	// The key is the id of the script or style tag
}));

/**
 * Force full reload to not reregister web components
 */
const req = require.context('../src', true, /\.stories\.(mdx)$/);
configure(req, module);
if (module.hot) {
	module.hot.accept(req.id, () => {
		const currentLocationHref = window.location.href;
		window.history.pushState(null, null, currentLocationHref);
		window.location.reload();
	});
}
