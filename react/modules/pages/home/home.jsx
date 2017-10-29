var RenderObj = require('../../mixins/renderObj.jsx');
var Conf = require('../../conf.jsx');

// 定义组件
// 首页组件
var Home = React.createClass({
	// 使用混合
	mixins: [RenderObj],
	// 定义数据
	getInitialState: function() {
		return {
			list: Conf.DATABASE
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
module.exports = Home;