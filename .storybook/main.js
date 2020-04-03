module.exports = {
	addons: [
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
				babelOptions: {},
				sourceLoaderOptions: null,
			},
		},
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
		'@storybook/addon-backgrounds',
		'@storybook/addon-knobs',
		'@storybook/addon-links',
		'@storybook/addon-viewport',
	]
};
