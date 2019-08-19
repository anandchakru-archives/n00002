var ghpages = require('gh-pages');
var fs = require('fs-extra');
fs.ensureDirSync('./dist/assets');
fs.ensureDirSync('./dist/js');
fs.ensureDirSync('./dist/css');
fs.ensureDirSync('./dist/vendor');
fs.emptyDirSync('./dist');
fs.copySync('./assets', './dist/assets');
fs.copySync('./css', './dist/css');
fs.copySync('./js', './dist/js');
fs.copySync('./vendor', './dist/vendor');
fs.copySync('./index.html', './dist/index.html');
fs.copySync('./index.html', './dist/404.html');

ghpages.publish('./dist', function (err) { });