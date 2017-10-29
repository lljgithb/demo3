// 实现异步请求
var Util = {
	/**
	 * 实现异步请求
	 * @url 	请求地址
	 * @fn 		请求回调函数
	 **/ 
	ajax: function(url, fn) {
		// 初始化xhr
		var xhr = new XMLHttpRequest();
		// 监听事件
		xhr.onreadystatechange = function() {
			// 判断状态
			if (xhr.readyState === 4) {
				// 判断状态码
				if (xhr.status === 200) {
					// 执行fn
					fn && fn(JSON.parse(xhr.responseText))
				}
			}
		}
		// 打开链接
		xhr.open('GET', url, true);
		// 发送数据
		xhr.send(null)
	}
}
// 定义过滤器
Vue.filter('priceFilter', function(price) {
	return price + '元';
})
Vue.filter('originPriceFilter', function(price) {
	return '门市价:' + price + '元';
})
Vue.filter('salesFilter', function(sales) {
	return '销量' + sales;
})
// 测试
// Util.ajax('data/home.json', function(res) {
// 	console.log(res)
// })
// 第二步 定义组件类
// 首页
var Home = Vue.extend({
	template: '#tpl_home',
	// 定义同步的数据
	data: function() {
		// 返回值是绑定的数据
		return {
			types: [
				{ id: 1, url: '01.png', title: '美食' },
				{ id: 2, url: '02.png', title: '电影' },
				{ id: 3, url: '03.png', title: '酒店' },
				{ id: 4, url: '04.png', title: '休闲娱乐' },
				{ id: 5, url: '05.png', title: '外卖' },
				{ id: 6, url: '06.png', title: 'KTV' },
				{ id: 7, url: '07.png', title: '周边游' },
				{ id: 8, url: '08.png', title: '丽人' },
				{ id: 9, url: '09.png', title: '小吃快餐' },
				{ id: 10, url: '10.png', title: '火车票' }
			],
			// 定义属性数据，让其具有特性
			ad: [],
			list: []
		}
	},
	// 请求数据
	created: function() {
		// 作用域是组件实例化对象
		var me = this;
		Util.ajax('data/home.json', function(res) {
			// console.log(res, this)
			// 请求成功，存储数据
			if (res && res.errno === 0) {
				me.ad = res.data.ad;
				me.list = res.data.list;
			}
		})
	}
	// // 定义组件生命周期方法
	// beforeCreate: function() {
	// 	console.log(111, arguments, this)
	// },
	// created: function() {
	// 	console.log(222, arguments, this, this.types)
	// },
	// beforeMount: function() {
	// 	console.log(333, arguments, this, this.$el)
	// },
	// mounted: function() {
	// 	console.log(444, arguments, this, this.$el)
	// },
	// beforeUpdate: function() {
	// 	console.log(555, arguments, this)
	// },
	// updated: function() {
	// 	console.log(666, arguments, this)
	// },
	// beforeDestroy: function() {
	// 	console.log(777, arguments, this)
	// },
	// destroyed: function() {
	// 	console.log(888, arguments, this)
	// }
})
// 列表页
var List = Vue.extend({
	template: '#tpl_list',
	// 注册变量
	props: ['query', 'search'],
	// 定义同步的数据
	data: function() {
		return {
			orders: [
				{ id: 'price', text: '价格排序' },
				{ id: 'sales', text: '销量排序' },
				{ id: 'evaluate', text: '好评排序' },
				{ id: 'discount', text: '优惠排序' }
			],
			// 让属性数据具有特性，一定要先定义
			list: [],
			// 存储未显示的数据
			other: []
		}
	},
	// 动态数据绑定
	computed: {
		dealList: function() {
			// 获取输入的内容
			// var search = this.$parent.searchValue;
			var search = this.search;
			// 过滤集合
			var result = [];
			// 遍历
			for (var i = 0; i < this.list.length; i++) {
				// 查看title中包含搜索关键字的
				if (this.list[i].title.indexOf(search) >= 0) {
					// 存储符合条件的
					result.push(this.list[i])
				}
			}
			// 返回值就是渲染的数据
			return result;
		}
	}, 
	// 定义事件回调函数
	methods: {
		// 点击查看更多
		showOther: function() {
			// 将other中的数据，添加给list
			this.list = this.list.concat(this.other);
			// other要清空
			this.other = [];
		},
		// 排序
		listOrder: function(id) {
			// 对list排序
			this.list.sort(function(a, b) {
				// 如果是优惠字段，应该比较门市价与现价的差值
				if (id === 'discount') {
					// b的门市价与b的现价差值 与 a的门市价与a的现价差值 比较
					// 降序
					// return (b.originPrice - b.price) - (a.originPrice - a.price)
					// 升序
					return (a.originPrice - a.price) - (b.originPrice - b.price)
				}
				// 比较id变量属性大小
				// 正序（升序）
				// return a[id] - b[id]
				// 倒序（）降序
				return b[id] - a[id]
			})
		}
	},
	// 组件创建完成要加载数据
	created: function() {
		var me = this;
		// 获取父组件中的数据有两种方式
		// 第一种 
		// this.query;
		// 第二种
		// this.$parent.query
		// console.log(this)
		// 获取数据
		Util.ajax('data/list.json?id=' + this.query[1], function(res) {
			// console.log(res)
			// 请求成功将数据存储在组件中
			if (res && res.errno === 0) {
				// 保存三个数据
				me.list = res.data.slice(0, 3);
				// 保存剩余的数据
				me.other = res.data.slice(3)
			}
		})
	}
})
// 详情页
var Detail = Vue.extend({
	template: '#tpl_detail',
	// 绑定数据
	data: function() {
		return {
			// 存储的数据要先定义出来
			data: {}
		}
	},
	created: function() {
		var me = this;
		// 请求
		Util.ajax('data/product.json?id=' + me.$parent.query[0], function(res) {
			// 请求成功，存储数据
			if (res && res.errno === 0) {
				me.data = res.data;
			}
		})
	}
})
// 第三步 注册组件
Vue.component('home', Home)
Vue.component('list', List)
Vue.component('detail', Detail)


// 创建vue实例化对象
var app = new Vue({
	el: '#app',
	// 绑定数据
	data: {
		// 定义渲染视图的名称
		view: 'home',
		// 表示路由参数
		query: [],
		// 搜索内容
		search: '',
		// 真正搜索的词
		searchValue: ''
	},
	// 绑定事件
	methods: {
		goToSearch: function() {
			// 用search去更新searchValue
			this.searchValue = this.search;
			// 清空搜索内容
			this.search = '';
		}
	}
	// 定义组件生命周期方法
	// beforeCreate: function() {
	// 	console.log(111, arguments, this)
	// },
	// created: function() {
	// 	console.log(222, arguments, this, this.types)
	// },
	// beforeMount: function() {
	// 	console.log(333, arguments, this, this.$el)
	// },
	// mounted: function() {
	// 	console.log(444, arguments, this, this.$el)
	// },
	// beforeUpdate: function() {
	// 	console.log(555, arguments, this)
	// },
	// updated: function() {
	// 	console.log(666, arguments, this)
	// },
	// beforeDestroy: function() {
	// 	console.log(777, arguments, this)
	// },
	// destroyed: function() {
	// 	console.log(888, arguments, this)
	// }
})
// 定义路由方法
var route = function() {
	// console.log(111)
	// 解析hash，就要获取hash
	var hash = location.hash;
	// #和#/是无意义的。因此要过滤掉
	hash = hash.replace(/#\/?/, '');
	// 根据/切割, 得到的一个数组
	hash = hash.split('/')
	// 第一个模块表示组件的名称，更改view数据
	// 不是所有的名称都能渲染，定义了组件的名称才能渲染
	var map = {
		home: true,
		list: true,
		detail: true
	}
	// 在map表中，存在即可渲染
	if (map[hash[0]]) {
		app.view = hash[0]
	} else {
		// 否则进入默认路由
		app.view = 'home'
	}
	// 从第二个成员开始表示路由参数了
	app.query = hash.slice(1);
	
}
// 实现路由
window.addEventListener('hashchange', route)
// 页面加载完成，也需要解析hash，所以我们要将回调函数提取出来
// window.addEventListener('load', route)
// 页面中dom渲染完成，js加载完成就可以执行了
route()