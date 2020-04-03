/**
 * The stencil config file.
 * https://stenciljs.com/docs/config
 */

import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { kebabCase } from 'lodash';

import { name } from './package.json';
import { stencil } from './config.json';

// Fix for scoped package names
const normalizedPkgName = kebabCase(name);

// Assign defaults when importing from package.json
const { host = 'localhost', port = 4300 } = stencil;

/**
 * Export the stencil config to be used with the StencilJS CLI
 */
export const config: Config = {
	namespace: normalizedPkgName,
	srcDir: 'src',
	globalStyle: 'src/globals/scss/styles.scss',
	globalScript: null,
	plugins: [
		sass({
			injectGlobalPaths: [
				'src/globals/scss/01_settings/settings.scss',
				'src/globals/scss/02_tools/tools.scss'
			],
			includePaths: ['./node_modules']
		})
	],
	devServer: {
		address: host,
		port: port,
		openBrowser: false
	},
	outputTargets: [
		{
			type: 'dist',
			esmLoaderPath: '../.stencil/loader'
		},
		{
			type: 'www',
			dir: './.stencil/www',
			copy: [
				{
					src: 'assets',
					dest: 'build/assets'
				}
			],
			serviceWorker: null,
		},
	],
	bundles: stencil.bundles,
	enableCache: true
};
