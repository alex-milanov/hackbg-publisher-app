// crud

var UsersCtrl = (function(){

	var useRres = new Resource("/api/users");

	var list = function(){
		return useRres.query().then(function(result){
			var container = $("#users");
			var tplName = "views/users.jade"
			var data = {
				users: result.list
			};

			return helpers.displayWithJade(container, tplName, data);	
		})
		
	}

	var reset = function(){
		$('#users-form').trigger("reset");
		$('#users-form').find("[name=_id]").val("");
	}

	var edit = function(id){
		useRres.view(id).then(function(data){
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
			
			useRres.update(id, data)
				.then(function(){
					console.log("Updated Successfuly!")
					list();
				})
		// else create
		} else {
			useRres.create(data)
				.then(function(){
					console.log("Created Successfuly!")
					list();
				})
		}

		
	}

	var remove = function(id){
		PublisherApp.deleteMag(id).then(function(){
			console.log("Deleted "+id+" successfuly!");
			list();
		})
	}

	var init = function(){

		$("#users").on("submit", "#users-form",function(event){
			var data = helpers.getDataFromForm($(this));
			save(data);
			event.preventDefault();
		})

		$("#users").on("click", ".action-reset",function(event){
			reset();
		})

		$("#users").on("click", ".action-delete", function(){
			var id = $(this).data("id");
			remove(id);
		})

		$("#users").on("click", ".action-edit", function(){
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
