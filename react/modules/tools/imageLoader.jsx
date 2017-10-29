var Conf = require('../conf.jsx');
var ITEM_NUM = Conf.ITEM_NUM;
var BANNER_NUM = Conf.BANNER_NUM;
/**
 * 定义加载库
 * @done 	加载完成执行的回调函数
 * @success 加载成功执行的回调函数
 * @fail 	加载失败执行的回调函数
 **/ 
function ImageLoader(done, success, fail) {
	// 定义默认参数
	this.done = done || function() {}
	this.success = success || function() {}
	this.fail = fail || function() {}
	// 初始化
	this.init()
}
// 定义原型方法
ImageLoader.prototype = {
	// 初始化数据
	init: function() {
		// 定义图片数量
		this.itemNum = ITEM_NUM;
		// 定义banner数量
		this.bannerNum = BANNER_NUM;
		// 定义总数
		this.total = this.itemNum + this.bannerNum;
		// 加载图片
		this.loadImage();
	},
	// 定义加载图片的方法
	loadImage: function() {
		// 加载banner图片
		// 复制banner图片总数。然后加载
		var num = this.bannerNum;
		while(--num >= 0) {
			this.loadImageItem(num, true)
		}
		// 复制图片总数，然后加载
		var num = this.itemNum;
		while(--num >= 0) {
			this.loadImageItem(num)
		}
	},
	/**
	 * 加载具体某一张图片的方法
	 * @num 		图片id
	 * @isBanner 	是否是banner图片
	 **/
	loadImageItem: function(num, isBanner) {
		// 创建图片加载器
		var img = new Image();
		// 加载成功时候的回调函数
		img.onload = function() {
			// 将图片总数减一
			this.total--
			// 每次都要执行success
			this.success(this.total, this.itemNum + this.bannerNum);
			// total为0 说明全局加载成功了
			if (this.total === 0) {
				this.done(this.total, this.itemNum + this.bannerNum)
			}
		}.bind(this)
		// 图片加载失败时候的回调函数
		img.onerror = function() {
			// 将图片总数减一
			this.total--;
			// 失败了执行fail
			this.fail(this.total, this.itemNum + this.bannerNum)
			// total为0，说明全部加载完成
			if (this.total === 0) {
				this.done(this.total, this.itemNum + this.bannerNum)
			}
		}.bind(this)
		// 加载图片
		img.src = this.getImageUrl(num, isBanner)
	},
	/**
	 * 获取图片完整路径的方法
	 * @num 		图片id
	 * @isBanner 	是否是banner图片
	 * return 		是图片地址
	 **/ 
	getImageUrl: function(num, isBanner) {
		// 是否是banner图片
		if (isBanner) {
			return 'img/banner/banner' + num + '.jpg';
		} else {
			return 'img/item/item' + num + '.jpg';
		}
	}
}

module.exports = ImageLoader;