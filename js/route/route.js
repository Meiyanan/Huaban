define(["backbone", "index-page/index-page","collection/collection","collection/banner","banner/banner", "bar-defail/bar-defail", "bar-list/bar-list"], function(Backbone,Index,Collection,BannerClt,BannerView,BardefailView,Barlistview){

	var Ic = new Collection();
	var Bic = new BannerClt();

	var Indexhtml = new Index({
		el:"#page",
		collection:Ic
	});

	var banview = new BannerView({
		el:"#page",
		collection:Bic
	});

	var bardefail = new BardefailView({
		el:"#page",
		collection:Bic
	});

	var barlistview = new Barlistview({
		el:"#page",
		collection:Bic
	})
	
	var Router = Backbone.Router.extend({
		routes: {
			'banner/:PagaId': 'showBannerDefail',
			// 列表页是默认的
			'*other': 'showIndex'
		},
		showIndex: function() {
			banview.$(".new_index_page").show();
			banview.$("#bar-defail").hide();
			// BanView.render();
		},
		showBannerDefail: function(PagaId) {
			// this.$(".index_page").hide();
			bardefail.$('.new_index_page').hide();
			bardefail.$("#bar-defail").show();
			bardefail.render(PagaId);
			barlistview.initDom();
			barlistview.initData();
			barlistview.render(PagaId);
			// var left = document.getElementById("left");
			// var leftH = window.getComputedStyle(left).height;
			// console.log(leftH)
			// console.log(bardefail.$(".img img"))
		}
	});

	new Router();
	return function() {
		Backbone.history.start();
	}
})