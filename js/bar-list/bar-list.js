define(['backbone', 'underscore', 'zepto', 'css!./bar-list.css'], function(Backbone, _, $) {
	return Backbone.View.extend({
		tpl:_.template($("#banner-list").html()),
		initialize: function() {
			
		},
		initData: function() {
			this.leftH = 0;
			this.rightH = 0;
			this.imgLH = 0;
			this.imgRH = 0;
		},
		initDom: function() {
			this.leftcontainer = this.$(".bar-defail .new-explore .left");
			this.rightcontainer = this.$(".bar-defail .new-explore .right");
			// console.log(this.leftcontainer,this.rightcontainer);
		},
		getimgheight: function(src) {
			// var me = this;
			var img = new Image();
			img.src = src;
			return img;
			// img.onload = function() {
			// 	var width = this.width;
			// 	var height = this.height;
			// 	me.imgRH += 145 * height / width;
			// }
		},
		render: function(id){
			var me = this;
			var model = this.collection.get(id);
			if(!model){
				Backbone.history.location.replace("#");
				return;
			}
			var result = model.get("defail");
			_.forEach(result,function(obj,index,arr){
				// console.log(obj.src)
				var htmltpl = me.tpl(obj);
				var img = me.getimgheight(obj.src);
				img.onload = function() {
					var width = this.width;
					var height = this.height;
					if(me.leftH <= me.rightH){
						me.renderLeft(htmltpl,width,height);
					}else{
						me.renderRight(htmltpl,width,height);
					}
				}
			})
		},
		renderLeft:function(html,width,height){
			this.leftcontainer.append(html);
			this.imgLH += 145 * height / width;
			this.leftH = this.leftcontainer.height() + this.imgLH;
		},
		renderRight:function(html,width,height){
			this.rightcontainer.append(html);
			this.imgRH += 145 * height / width;
			this.rightH = this.leftcontainer.height() + this.imgRH;
		}
	})

})