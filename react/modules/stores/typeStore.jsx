var TypeActions = require('../actions/typeAction.jsx')
var Conf = require('../conf.jsx')
// 第二步 定义store
var TypeStore = Reflux.createStore({
	// 监听消息对象
	listenables: [TypeActions],
	// 定义消息
	onChangeType: function(id) {
		// 从DATABASE中找到类型是id的数据
		var result = [];
		// 遍历数据
		Conf.DATABASE.forEach(function(obj, index) {
			// obj的type等于id
			if (obj.type === id) {
				// 缓存该成员
				result.push(obj)
			}
		})
		// 更新状态
		this.trigger(result)
		// console.log(this, arguments)
	}
})

module.exports = TypeStore;