var RenderObj = require('../../mixins/renderObj.jsx')
var SearchStore = require('../../stores/searchStore.jsx')

// 搜索页面组件
var Search = React.createClass({
	// 混合
	// 绑定store
	mixins: [RenderObj, Reflux.connect(SearchStore, 'list')],
	// 状态
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

module.exports = Search;