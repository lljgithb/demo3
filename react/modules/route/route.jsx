// 引入模块
var App = require('../app/app.jsx');
var Type = require('../pages/type/type.jsx')
var Search = require('../pages/search/search.jsx')
var Home = require('../pages/home/home.jsx')

// 第二步 定义路由规则
// 缓存路由组件
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
// 定义路由规则
var routes = (
	<Router>
		<Route path="/" component={App}>
			<Route path="type/:id" component={Type}></Route>
			<Route path="search/:query" component={Search}></Route>
			{/*默认路由*/}
			<IndexRoute component={Home}></IndexRoute>
			{/*重定向
			<ReactRouter.Redirect path="ickt" to="search/ickt"></ReactRouter.Redirect>*/}
		</Route>
		<ReactRouter.Redirect path="*" to="/"></ReactRouter.Redirect>
	</Router>
)
module.exports = routes;
