var SearchAction = require('../actions/searchAction.jsx')
var Conf = require('../conf.jsx')

// 定义store
var SearchStore = Reflux.createStore({
	// 监听action
	listenables: [SearchAction],
	// 监听消息
	onSearchValue: function(query) {
		// console.log(arguments)
		// 判断数据中每个成员是否包含query
		var result = [];
		// 遍历数据
		Conf.DATABASE.forEach(function(obj, index) {
			// 寻找obj包含query的成员
			// 遍历obj
			for (var i in obj) {
				// i属性名称， obj[i]属性值
				if (obj[i].indexOf(query) >= 0) {
					// 保存对象
					result.push(obj)
					// 防止多次存储
					return ;
				}
			}
		})
		// 更新状态
		this.trigger(result)
	}
})

module.exports = SearchStore;