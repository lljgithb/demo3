// 加载模块
var ImageLoader = require('tools/imageLoader.jsx')
var Conf = require('conf.jsx')
var routes = require('route/route.jsx')
var textDOM = $('.loader-text span')
// 加载图片
new ImageLoader(function(current, total) {
	// current / totoal => 剩余图片占有的百分比
	// 加载了多少 就是 1 - current / totoal
	textDOM.html('100.00')
	// 请求数据，
	$.get('data/sites.json')
		.success(function(res) {
			// console.log('success', res)
			// 请求成功，将数据存储
			if (res && res.errno === 0) {
				Conf.DATABASE = res.data;
				// console.log(DATABASE)
				// 渲染组件
				// 第三步 渲染路由
				ReactDOM.render(routes, $('#app').get(0))
			}
		})
}, function(current, total) {
	// 修改加载进度
	textDOM.html(((1 - current / total) * 100).toFixed(2))
}, function(current, total) {
	// 修改加载进度
	textDOM.html(((1 - current / total) * 100).toFixed(2))
})