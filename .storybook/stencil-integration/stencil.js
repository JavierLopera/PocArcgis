/**
 * Import the custom addon for adding assets to the manager head.
 */
import withAssets from './addons';
import { kebabCase } from 'lodash';

import { name } from '../../package.json';
import { stencil } from '../../config.json';

const { host, port, protocol, buildDir } = stencil;

// Fix for scoped package names
const normalizedPkgName = ((name) => {
	let _name = name.replace(/\@/g, '');
	_name = _name.replace(/\//, '-');
	return kebabCase(_name)
})(name);

/**
 * Function to get the stencil resources
 */
const getStencilResources = () => ({
	'components-css':
		process.env.NODE_ENV === 'development'
			? `${protocol}://${host}:${port}/${buildDir}/${normalizedPkgName}.css`
			: `/${buildDir}/${normalizedPkgName}.css`,
	'component-js':
		process.env.NODE_ENV === 'development'
			? `${protocol}://${host}:${port}/${buildDir}/${normalizedPkgName}.js`
			: `/${buildDir}/${normalizedPkgName}.js`,
	'component-js-module':
		process.env.NODE_ENV === 'development'
			? `${protocol}://${host}:${port}/${buildDir}/${normalizedPkgName}.esm.js`
			: `/${buildDir}/${normalizedPkgName}.esm.js`,
});
/**
 * With assets custom decorator
 */
export default (config) => {
	return withAssets({
		assets: {
			...getStencilResources(),
			...config,
		},
	});
};
