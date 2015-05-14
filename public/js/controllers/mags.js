// crud

var MagsCtrl = (function(){

	var magRes = new Resource("/api/mags");

	var list = function(){
		return magRes.query().then(function(result){
			var container = $("#mags");
			var tplName = "views/mags.jade"
			var data = {
				mags: result.list
			};

			return helpers.displayWithJade(container, tplName, data);	
		})
		
	}

	var reset = function(){
		$('#mags-form').trigger("reset");
		$('#mags-form').find("[name=_id]").val("");
	}

	var edit = function(id){
		magRes.view(id).then(function(data){
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
			
			magRes.update(id, data)
				.then(function(){
					console.log("Updated Successfuly!")
					list();
				})
		// else create
		} else {
			magRes.create(data)
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

		$("#mags").on("submit", "#mags-form",function(event){
			var data = helpers.getDataFromForm($(this));
			save(data);
			event.preventDefault();
		})

		$("#mags").on("click", ".action-reset",function(event){
			reset();
		})

		$("#mags").on("click", ".action-delete", function(){
			var id = $(this).data("id");
			remove(id);
		})

		$("#mags").on("click", ".action-edit", function(){
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
