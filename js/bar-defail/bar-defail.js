define(['backbone', 'underscore', 'zepto', 'css!./bar-defail.css'], function(Backbone, _, $) {
	
	return Backbone.View.extend({
		tpl:_.template($("#bardtltpl").html()),
		initialize: function() {
			// this.getData();
			// this.listenTo(this.collection, "add", function(model,collection,options) {
			// 	this.render(model);
			// })
			this.initDom();
			// this.render()
		},
		initDom: function() {
			this.dom = this.$("#bar-defail .content");
		},
		render: function(id){
			this.$(".index_page").hide();
			this.$('.new_index_page').hide();
			var model = this.collection.get(id);
			if(!model){
				Backbone.history.location.replace("#");
				return;
			}
			var data = {
				bgurl: model.get("bgurl"),
				title:model.get("title"),
				authors01:model.get("authors").src01,
				authors02:model.get("authors").src02,
				authors03:model.get("authors").src03,
				authors04:model.get("authors").src04,
				authors05:model.get("authors").src05,
				moresurl01:model.get("mores")[0].url,
				moresurl02:model.get("mores")[1].url,
				morestitle01:model.get("mores")[0].title,
				morestitle02:model.get("mores")[1].title
			}
			// console.log(data);
			var html = this.tpl(data);
			this.dom.html(html);

		}
	})

})