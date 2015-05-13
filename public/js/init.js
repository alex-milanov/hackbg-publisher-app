$(document).ready(function(){

	PublisherApp.listMags()
		.then(function(){
			$("#mags-form").on("submit", function(event){
				var data = helpers.getDataFromForm($(this));

				PublisherApp.createMag(data)
					.then(function(){
						console.log("Created Successfuly!")
						PublisherApp.listMags();
					})

				event.preventDefault();
			})
		
		});

	PublisherApp.listSubs();

	PublisherApp.listUsers();

	// queries
	/*
	
*/



})