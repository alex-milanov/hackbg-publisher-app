$(document).ready(function(){

	PublisherApp.listMags();

	$("#mags").on("submit", "#mags-form",function(event){
		var data = helpers.getDataFromForm($(this));

		PublisherApp.createMag(data)
			.then(function(){
				console.log("Created Successfuly!")
				PublisherApp.listMags();
			})

		event.preventDefault();
	})

	$("#mags").on("click", ".action-delete", function(){
		var id = $(this).data("id");
		PublisherApp.deleteMag(id).then(function(){
			console.log("Deleted "+id+" successfuly!");
			PublisherApp.listMags();
		})
	})

	PublisherApp.listSubs();

	PublisherApp.listUsers();

	// queries
	/*
	
*/



})