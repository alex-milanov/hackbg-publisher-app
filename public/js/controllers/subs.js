// crud

var SubsCtrl = (function(){

	var subRes = new Resource("/api/subs");

	var list = function(){
		return subRes.query().then(function(result){
			var container = $("#content");
			var tplName = "views/subs.jade"
			var data = {
				subs: result.list
			};

			return helpers.displayWithJade(container, tplName, data);	
		})
		
	}

	var reset = function(){
		$('#subs-form').trigger("reset");
		$('#subs-form').find("[name=_id]").val("");
	}

	var edit = function(id){
		subRes.view(id).then(function(data){
			Object.keys(data).forEach(function(field){
				var formElement = $("[name="+field+"]");
				formElement.val(data[field]);
			})			
		})
	}

	var save = function(data){
		
		var id = data._id || "";
		delete(data._id);

		// if id update
		if(id !== ""){
			
			subRes.update(id, data)
				.then(function(){
					console.log("Updated Successfuly!")
					list();
				})
		// else create
		} else {
			subRes.create(data)
				.then(function(){
					console.log("Created Successfuly!")
					list();
				})
		}

		
	}

	var remove = function(id){
		subRes.delete(id).then(function(){
			console.log("Deleted "+id+" successfuly!");
			list();
		})
	}

	var init = function(){

		$("#content").on("submit", "#subs-form",function(event){
			var data = helpers.getDataFromForm($(this));
			save(data);
			event.preventDefault();
		})

		$("#content").on("click", ".action-reset",function(event){
			reset();
		})

		$("#content").on("click", ".action-delete", function(){
			var id = $(this).data("id");
			remove(id);
		})

		$("#content").on("click", ".action-edit", function(){
			var id = $(this).data("id");
			edit(id);
		})

		list();

	}

	return {
		list: list,
		reset: reset,
		edit: edit,
		save: save,
		remove: remove,
		init: init
	};

})();
