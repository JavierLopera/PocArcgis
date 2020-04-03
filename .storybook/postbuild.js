const archiver = require('archiver');
const jsonfile = require('jsonfile');
const path = require('upath');
const fs = require('fs');

jsonfile.writeFileSync(path.join(__dirname, '../storybook-static/package.json'), {
	"name": "@correos/ui-kit",
	"scripts": {
		"start": "npx http-server -p 4300 -o -c-1 --cors"
	}
})

const zipOutput = fs.createWriteStream(path.join(__dirname, '../AEM.zip'));
const archive = archiver('zip', {
	zlib: { level: 9 }
});
archive.pipe(zipOutput);
archive.directory('dist/');
archive.directory('storybook-static/');
archive.finalize();
