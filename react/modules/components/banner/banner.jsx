// 定义banner组件
{/*<ReactRouter.Link to="/search/hello">search</ReactRouter.Link>
<ReactRouter.Link to="/type/movie">type</ReactRouter.Link>*/}
var Link = ReactRouter.Link;
var Banner = React.createClass({
	// 进入首页
	goHome: function() {
		// 更改hash就可以
		// location.hash = '#/'
		// 还可以通过路由更改
		ReactRouter.hashHistory.replace('/')
	},
	// 搜索方法
	goSearch: function(e) {
		// 判断enter键 
		if (e.keyCode === 13) {
			// 获取值
			// var val = e.target.value
			var val = this.refs.searchInput.value;
			// 大家实现约束性的
			// 校验合法性: 找到全是空白符的正则
			if (/^\s*$/.test(val)) {
				alert('请您输入内容！')
				// 不要再执行了
				return
			}
			// 合法，更新路由
			ReactRouter.hashHistory.replace('/search/' + val)
			// 情况输入框
			this.refs.searchInput.value = '';
		}
	},
	render: function() {
		return (
			<div className="header">
				<div className="header-top">
					<div className="container">
						<img onClick={this.goHome} src="img/logo.png" alt="" className="logo pull-left"/>
						<div className="search pull-right">
							{/*绑定事件驼峰式命名*/}
							<input ref="searchInput" onKeyUp={this.goSearch} type="text" className="form-control"/>
						</div>
						<ul className="nav nav-pills nav-justified">
							<li>
								<Link to="/type/movie">视频</Link>
							</li>
							<li>
								<Link to="/type/games">游戏</Link>
							</li>
							<li>
								<Link to="/type/news">新闻</Link>
							</li>
							<li>
								<Link to="/type/sports">体育</Link>
							</li>
							<li>
								<Link to="/type/buy">购物</Link>
							</li>
							<li>
								<Link to="/type/friends">社交</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="banner banner-1"></div>
			</div>
		)
	}
})

module.exports = Banner;