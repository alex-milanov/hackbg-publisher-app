

var app = function(){

	var ctrls = {};

	var router = Router();

	var routes = [{
		url: "/mags",
		default: true,
		ctrl: "MagsCtrl"
	},{
		url: "/subs",
		ctrl: "SubsCtrl"
	},{
		url: "/users",
		ctrl: "UsersCtrl"
	}]

	var init = function(){

		routes.forEach(function(route){
			if(typeof route.ctrl === "string" && ctrls[route.ctrl]){
				route.callback = ctrls[route.ctrl].init
			}
			router.addRoute(route); 
		})

		router.init();

	}

	var addCtrl = function(name, ctrl){
		ctrls[name] = ctrl;
	}

	return {
		init: init,
		addCtrl: addCtrl
	}

}()