define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var _ = require("lodash");
	var firebase = require("firebase");


	
	return function (userid) {
		var deferred = Q.defer();
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid);
				ref.on("value", function(snapshot) {
					var collectionsRef = snapshot.val();
					
					console.log("collectionsRef", collectionsRef);
					deferred.resolve(collectionsRef);
				});
				return deferred.promise;
			};
});


		// return function (userid) {
	
		// $.ajax({
		// 	url:"https://movie-history-enm.firebaseio.com/collections/" + userid + ".json/",
		// 	error: function (a, b, c) {
		// 	console.log(a, b, c);
		// 	}	
		// }).done(function(userMovies) {
		// 			console.log("userMovies", userMovies);
					// require(['hbs!../templates/find-movies-results'], function(movieTemplate) {
	    //       $("#template-container").html(movieTemplate({movies:userMovies}));
	    //     });	

		// 	});
		// };