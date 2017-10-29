var Banner = require('../components/banner/banner.jsx')
var TypeAction = require('../actions/typeAction.jsx')
var SearchAction = require('../actions/searchAction.jsx')

// 定义应用程序
var App = React.createClass({
	render: function() {
		return (
			<div>
				<Banner></Banner>
				{/*第一步 在应用程序中，定义渲染的位置*/}
				{this.props.children}
			</div>
		)
	},
	// 检测路由
	checkRoute: function() {
		// 如果是分类页面
		if (this.props.location.pathname.indexOf('/type/') === 0) {
			// 第四步 发送消息
			// 向分类组件发送消息
			TypeAction.changeType(this.props.params.id)
		// 判断搜索页面
		} else if (this.props.location.pathname.indexOf('/search/') === 0) {
			// 发送消息
			SearchAction.searchValue(this.props.params.query)
		}
	},
	// 组件创建完成，发送个消息吧
	componentDidMount: function() {
		// console.log(this)
		this.checkRoute();
	},
	// 存在期也要发送
	componentDidUpdate: function() {
		this.checkRoute();
	}
})

module.exports = App;