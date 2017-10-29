var ITEM_NUM = require('../conf.jsx').ITEM_NUM;

// 定义混合
var RenderObj = {
	// 随机生成一个背景图片
	getBackgroundUrl: function() {
		return 'url(img/item/item' + parseInt(Math.random() * ITEM_NUM) + '.jpg)'
	},
	createList: function() {
		// 处理state中的数据
		return this.state.list.map(function(obj, index) {
			var styleObj = {
				backgroundImage: this.getBackgroundUrl()
			}
			return (
				<li key={index} style={styleObj}>
					<a href={obj.site}>
						<div className="content">
							<h2>{obj.name}</h2>
						</div>
						<div className="layer">
							{/*公司：{obj.company}会额外添加两个span。{'类型：' + obj.type}不会添加span*/}
							<p>{'公司：' + obj.company}</p>
							<p>{'类型：' + obj.type}</p>
							<p>{'描述：' + obj.description}</p>
						</div>
					</a>
				</li>
			)
		}.bind(this))
	}
}
module.exports = RenderObj;