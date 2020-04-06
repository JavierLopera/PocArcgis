/**
 * The stencil config file.
 * https://stenciljs.com/docs/config
 */

import generatePackageJson from 'rollup-plugin-generate-package-json';
import { reactOutputTarget } from '@stencil/react-output-target';
import { env } from '@alepop/stencil-env';
import { postcss } from '@stencil/postcss';
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { kebabCase } from 'lodash';

import { name as pkgName } from './package.json';
import { stencil } from './config.json';

// Fix for scoped package names
const normalizedPkgName = kebabCase(pkgName);

// Assign defaults when importing from package.json
const { host = 'localhost', port = 4300 } = stencil;

// Make the path of the env files
const getEnvFile = () => {
	const dev = process.argv && process.argv.indexOf('--dev') > -1;
	return `environments/.env.${dev ? 'dev' : 'prod'}`;
}

/**
 * Export the stencil config to be used with the StencilJS CLI
 */
export const config: Config = {
	namespace: normalizedPkgName,
	srcDir: 'src',
	globalStyle: 'src/globals/scss/styles.scss',
	globalScript: null,
	commonjs: {
		namedExports: {
			"node_modules/esri-loader/dist/umd/esri-loader.js": [
				"getScript",
				"isLoaded",
				"loadModules",
				"loadScript",
				"loadCss",
				"utils"
			]
		}
	},
	plugins: [
		env({
			path: getEnvFile(),
			encoding: 'utf8'
		}),
		generatePackageJson({
			outputFolder: 'dist',
			baseContents: (pkg) => ({
				"name": pkg.name,
				"version": pkg.version,
				"description": pkg.description,
				"license": pkg.license,
				"main": "index.js",
				"module": "index.mjs",
				"es2015": "esm/index.mjs",
				"es2017": "esm/index.mjs",
				"types": "types/index.d.ts",
				"collection": "collection/collection-manifest.json",
				"collection:main": "collection/index.js",
				"unpkg": "correos-ui-kit/correos-ui-kit.js",
				"devDependencies": pkg.devDependencies,
				"dependencies": pkg.dependencies
			})
		}),
		sass({
			injectGlobalPaths: [
				'src/globals/scss/01_settings/settings.scss',
				'src/globals/scss/02_tools/tools.scss'
			],
			includePaths: [
				'./node_modules',
				'./src/globals/scss/02_tools',
				'./src/globals/scss/04_theme/cdk',
				'./src/globals/scss/04_theme/ui',
				'./src/globals/scss/99_utilities'
			]
		}),
		postcss({
			plugins: [
				require('postcss-replace')({
					data: {
						scssFontsPath: process.env.SCSS_FONTS_PATH
					}
				})
			]
		})
	],
	devServer: {
		address: host,
		port: port,
		openBrowser: false
	},
	outputTargets: [
		reactOutputTarget({
			componentCorePackage: pkgName,
			proxiesFile: 'dist/stencil-react-components/index.ts'
		}),
		{
			type: 'dist',
			esmLoaderPath: '../dist/loader',
			copy: [
				{
					src: 'assets',
					dest: '../assets'
				},
				{
					src: 'globals/scss',
					dest: '../scss'
				}
			]
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
		}
	],
	bundles: stencil.bundles,
	enableCache: true
};
