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


