define(["backbone","underscore","zepto","zepto.touch","css!./banner.css"], function(Backbone, _, $) {
	
	return Backbone.View.extend({
		tpl:_.template('<li><a href="<%=href%>"><img src="<%=src%>"><span><%=title%></span></a></li>'),
		modelID:0,
		initialize: function() {
			this.getData();
			this.listenTo(this.collection, "add", function(model,collection,options) {
				this.render(model);
			})
			this.initDom();
		},
		initDom: function() {
			this.dom = this.$(".recommend-info ul");
		},
		getData: function() {
			this.collection.fetchData();
		},
		render: function(model) {
			var data = {
				href:"#banner/"+model.get("id"),
				src: model.get("url"),
				title:model.get("title")
			}
			var html = this.tpl(data);
			this.dom.append(html);
		}
	})
})