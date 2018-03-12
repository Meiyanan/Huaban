define(["backbone","underscore","zepto","zepto.touch","css!./index-page.css"],function(Backbone,_,$){
	var width = ($(window).width()-20)*662/1000;
	var height = width;
	var minwidth = ($(window).width()-20)*33/100;
	var minContent = height - minwidth*2/100 - minwidth;
	var jiange = 0;
	var y = 0;
	return Backbone.View.extend({
		events:{
			"tap .search_btn":"showSearch",
			"tap .search2 a" : "hideSearch",
			"tap .new_index_page .search2 div":"gotoSearch",
			"tap .recommend-floor span" : "getMore",
			"touchstart .index_page" : "showIndexStart",
			"touchmove .index_page" : "showIndexMove",
			"touchend .index_page" : "showIndexEnd",
			"tap .index_page .search1 div span" : "getSearch"
		},
		tpl:_.template($("#indextpl").html()),
		initialize: function() {
			this.getData();
			this.listenTo(this.collection, "add", function(model,collection,options) {
				this.render(model);
			})
			this.initDom();
		},
		getData: function() {
			this.collection.fetchData();
			if(this.collection.idx > 3){
				this.$(".recommend-floor span").html('没有内容了');
				return;
			}
			jiange += 6;
			this.$(".recommend-items").css("height",height * jiange + (($(window).width()-20)*8/1000)*(jiange - 1) + 20);
		},
		initDom: function() {
			this.dom = this.$(".recommend-items ul");
		},
		initData: function() {
			this.$(".cover-info .cover-logo").css("margin-top",$(window).height()*25/100)
			this.$(".index_page").css({"width":$(window).width(),"height":$(window).height()})
			this.$(".max-board").css({"width":width,"height":height});
			this.$(".max-figure").css({"width":width,"height":height});
			this.$(".min-figure").css({"width":minwidth,"height":height});
			this.$(".min-figure .content").css("height",minContent);
			this.$(".min-board").css({"width":minwidth,"height":height});
			this.$(".min-board .content").css("height",minContent);
		},
		render: function(model) {
			var data = {
				className: model.get("className"),
				href: "#/",
				bgurl: model.get("bgurl"),
				url: model.get("url"),
				title: model.get("title"),
				sammeln: model.get("sammeln"),
				fans: model.get("fans")
			}
			var html = this.tpl(data);
			this.dom.append(html);
			this.initData();
		},
		showSearch: function() {
			this.$(".logo").hide();
			this.$(".search_btn").hide();
			this.$(".search2").show();
			this.$(".search2 input").attr("autofocus","autofocus");
		},
		hideSearch: function() {
			this.$(".search2").hide();
			this.$(".logo").show();
			this.$(".search_btn").show();
		},
		getSearchInputValue: function() {
			return this.$(".search2 input").val();
		},
		checkSearchInputInvalid: function(val) {
			if(/^\s*$/g.test(val)){
				return true;
			}else{
				return false;
			}
		},
		trim:function(val){
			return val.replace(/^\s+|\s$/g,"");
		},
		collectionFilter:function(val){
			return this.collection.filter(function(model){
				 return model.get("title").indexOf(val) >= 0;
			})
		},
		renderAll:function(result){
			var me = this;
			_.forEach(result,function(model,index,models){
				me.render(model);
			})
		},
		clearView:function(){
			this.dom.html("");
		},
		clearSearchInputValue: function() {
			this.$(".search2 input").val("")
		},
		gotoSearch: function() {
			// 2 获取输入框的内容
			var val = this.getSearchInputValue();
			// 3 校验合法性
			if(this.checkSearchInputInvalid(val)){
				alert("您输入的内容有误！12");
				return;
			}
			var val = this.trim(val);
			// 4 过滤集合
			var result = this.collectionFilter(val);
			// 5 清空内容（图片内容，容器高度）
			this.clearView();
			// // 6 渲染视图
			this.renderAll(result);
			// // 7 清空（可选）
			this.clearSearchInputValue();
		},
		getMore: function(e) {
			this.getData();
		},
		// showIndex: function() {
		// 	// console.log(this.$(".index_page"))
		// 	this.$(".index_page").css("transform","translateY("+ (- $(window).height())+"px)");
		// 	setTimeout(function(){
		// 		this.$(".index_page").hide();
		// 	},900)
		// 	// this.$(".new_index_page").show();
		// },
		getSearchValue: function() {
			return this.$(".index_page .search1 input").val();
		},
		clearSearchValue: function() {
			this.$(".index_page .search input").val("")
		},
		getSearch: function() {
			console.log(111)
			this.$(".index_page").hide();
			// 2 获取输入框的内容
			var val = this.getSearchValue();
			console.log(val)
			// 3 校验合法性
			if(this.checkSearchInputInvalid(val)){
				alert("您输入的内容有误！");
				return;
			}
			var val = this.trim(val);
			// 4 过滤集合
			var result = this.collectionFilter(val);
			// 5 清空内容（图片内容，容器高度）
			this.clearView();
			// // 6 渲染视图
			this.renderAll(result);
			// // 7 清空（可选）
			this.clearSearchValue();
		},
		showIndexStart: function(e) {
			y = e.touches[0].clientY;
			this.$(".new_index_page").css("display","block");
			// console.log(y)
		},
		showIndexMove: function(e) {
			// var xianzai_y = e.touches[0].clientY;
			// // 实时的让ul跟随手指移动
			if((e.touches[0].clientY-y)>0){
				return;
				// this.$(".index_page").css("transform","translateY("+ (e.touches[0].clientY-y)+"px)");
				// this.style.transform = "translateY("+(e.touches[0].clientY-y)+"px)";
			}else{
				// console.log("<=0")
				this.$(".index_page").css("transform","translateY("+ (e.touches[0].clientY-y)+"px)");
				// this.$(".index_page").css("top",((xianzai_y-y))+"px)");
		  	// this.style.transform ="translateX("+(-idx*width+(e.touches[0].clientX-x))+"px)";
			}
	
			// this.$(".index_page").css("transform","translateY("+ (e.touches[0].clientY-y)+"px)");
		},
		showIndexEnd: function(e) {
			// console.log(e.changedTouches[0].clientY)
		// 手指离开的位置
			var likai_y = e.changedTouches[0].clientY;
			// 手指移动的距离
			var moved_y = likai_y-y; 
			// 如果手指移动超过100像素的距离 则根据移动的方向决定idx++还是idx--
			if(moved_y>100 || moved_y<-100){
				if(moved_y>0){
					this.$(".index_page").css("transform","translateY(" + 0 +"px)");
				}else{
					this.$(".index_page").css("transform", "translateY("+ (-$(window).height()) + "px)");
					clearTimeout(timer);
					var timer = setTimeout(function() {
						this.$(".index_page").css('display', 'none');
					}, 1000)
				}
			}else{
				this.$(".index_page").css("transform","translateY(" + 0 +"px)");
			}
			
		}
	})

})