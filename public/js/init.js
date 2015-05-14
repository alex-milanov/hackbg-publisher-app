$(document).ready(function(){

	//app.init();

	Router.addRoute({
		url: "/mags",
		callback: MagsCtrl.init
	})

	Router.addRoute({
		url: "/mags-edit",
		callback: function(){
			MagsCtrl.init()
				.then(function(){
					MagsCtrl.edit("5554d2c1ed64f5001de3a105");
				})
		}
	})

	Router.addRoute({
		url: "/users",
		callback: UsersCtrl.init,
		default: true
	})
	
	Router.addRoute({
		url: "/subs",
		callback: SubsCtrl.init
	})

	Router.addRoute({
		url: "/alert",
		callback: function(){
			alert("WTF is this!")
		}
	})

	Router.init();

	// queries
	/*
	
*/



})