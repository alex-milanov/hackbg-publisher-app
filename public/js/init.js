$(document).ready(function(){

	// resources
	var mag = new Resource("/api/mags");
	var sub = new Resource("/api/subs");
	var user = new Resource("/api/users");

	// queries
	mag.query().then(function(res){
		var container = $("#mags");
		var mags = res.list;

		return helpers.displayWithJade(container, "/views/mags.jade", {
			mags: mags
		});

	}).then(function(){
		$("#mags-form").on("submit", function(event){
			var data = helpers.getDataFromForm($(this));

			mag.create(data).then(function(){
				console.log("Created Successfuly!")
			})

			event.preventDefault();
		})
	
	})
	
	sub.query().then(function(res){
		var container = $("#subs");
		var subs = res.list;

		helpers.displayWithJade(container, "/views/subs.jade", {
			subs: subs
		});
	})

	user.query().then(function(res){
		var container = $("#users");
		var users = res.list;

		helpers.displayWithJade(container, "/views/users.jade", {
			users: users
		});
	})


})