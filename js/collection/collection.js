define(["backbone","model/model","underscore","zepto"],function(Backbone,Model,_,$){
	// console.log(new ImagesModel)
	var ImgCollection = Backbone.Collection.extend({
		model:Model,
		idx:0,
		modelID:0,
		fetchData:function(){
			this.idx ++;
			if(this.idx >3){
				return;
			}
			// console.log(this.idx)
			var me = this;
			$.get("data/imageList-0"+this.idx+".json",function(res){
				// console.log(res)
				if(res && res.errno === 0){
					// res.data.sort(function(){
					// 	return Math.random()>0.5?1:-1
					// })
					_.forEach(res.data,function(obj,index,arr){
						obj.id = me.modelID++;
						if(index % 4 === 0 || index % 4 === 3){
							if(obj.type === "画板"){
								obj.className = "max-board";
							}else{
								obj.className = "max-figure";
							}
						}else{
							if(obj.type === "画板"){
								obj.className = "min-board";
							}else{
								obj.className = "min-figure";
							}
						}
					})
					me.add(res.data);
					// me.forEach(function(model) {
					// 	console.log(model.toJSON())
					// })
					// console.log(me)
				}
			})
		}
	});
	// var ic = new ImgCollection();
	// ic.fetchData();
	return ImgCollection;
})