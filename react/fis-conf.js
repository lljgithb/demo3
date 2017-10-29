fis.hook('commonjs')
// 编译less
fis.match('**.less', {
	parser: 'less',
	rExt: '.css',
	packTo: 'static/all.css',
	optimizer: 'clean-css',
	useHash: true
})
fis.match('**.css', {
	packTo: 'static/lib.css',
	optimizer: 'clean-css',
	useHash: true
})
// 编译jsx
fis.match('modules/**.jsx', {
	parser: 'babel2',
	rExt: '.js',
	packTo: 'static/modules.js',
	isMod: true,
	optimizer: 'uglify-js',
	useHash: true
})
fis.match('lib/**.js', {
	packTo: 'static/lib.js',
	optimizer: 'uglify-js',
	useHash: true
})
fis.match('**.js', {
	useHash: true
})
// 打包阶段
fis.match('::package', {
	postpackager: 'loader'
})