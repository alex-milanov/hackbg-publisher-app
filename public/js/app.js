

var PublisherApp = function(){

	var magRes = new Resource("/api/mags");
	var subRes = new Resource("/api/subs");
	var userRes = new Resource("/api/users");

	var displayCollection = function(result, collectionName){
		var container = $("#"+collectionName);

		var data = {};
		data[collectionName] = result.list;

		var tplName = "/views/"+collectionName+".jade";

		return helpers.displayWithJade(container, tplName, data);
	}


	var listMags = function(){
		return magRes.query().then(function(res){
			return displayCollection(res, "mags")
		})
	}

	var listSubs = function(){
		return subRes.query().then(function(res){
			return displayCollection(res, "subs")
		})
	}

	var listUsers = function(){
		return userRes.query().then(function(res){
			return displayCollection(res, "users")
		})
	}

/*
	var callActionOnRes = function(res, action){
		return function(){
			// get arguments

			// call method/action
			res[action](args);
		}
	}
*/

	var createMag = function(data){
		return magRes.create(data);
	}

	var deleteMag = function(id){
		return magRes.delete(id);
	}

	return {
		listMags: listMags,
		listSubs: listSubs,
		listUsers: listUsers,
		createMag: createMag,
		deleteMag: deleteMag
	}

}()