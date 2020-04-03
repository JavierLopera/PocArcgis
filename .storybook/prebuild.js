const replace = require('replace-in-file');
const path = require('upath');

const getEnvFile = () => {
	const dev = process.argv && process.argv.indexOf('--dev') > -1;
	return `../environments/.env.${dev ? 'dev' : 'prod'}`;
}

const envData = require('dotenv').config({ path: path.join(__dirname, getEnvFile()) }).parsed;
const scssReplacePath = envData.SCSS_FONTS_PATH + 'assets/';

replace.sync({
	files: path.join(__dirname, '../.stencil/www/build/') + '**/*.css',
	from: new RegExp(scssReplacePath, 'g'),
	to: '/build/assets/',
});
