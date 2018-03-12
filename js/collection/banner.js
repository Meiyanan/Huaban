define(["backbone","model/model","underscore","zepto"],function(Backbone,Model,_,$){
	// console.log(new ImagesModel)
	var ImgCollection = Backbone.Collection.extend({
		model:Model,
		modelID:0,
		fetchData:function(){
			var me = this;
			$.get("data/banner.json", function(res){
				if(res && res.errno === 0){
					_.forEach(res.data,function(obj,index,arr){
						obj.id = me.modelID++;
					})
					me.add(res.data);
				}
			})
		}
	});
	// var ic = new ImgCollection();
	// ic.fetchData();
	return ImgCollection;
})