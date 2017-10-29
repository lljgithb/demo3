var RenderObj = require('../../mixins/renderObj.jsx')
var TypeStore = require('../../stores/typeStore.jsx')

// 分类页面组件
var Type = React.createClass({
	// 使用混合
	// 第三步 绑定store
	mixins: [RenderObj, Reflux.connect(TypeStore, 'list')],
	// 初始化状态
	getInitialState: function() {
		return {
			list: []
		}
	},
	render: function() {
		return (
			<div className="section">
				<div className="container">
					<ul className="clearfix">{this.createList()}</ul>
				</div>
			</div>
		)
	}
})
module.exports = Type;