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
				var filteredWatched = _.filter(collectionsRef, function(obj) {
					if (obj.Watched) {
						return obj;
					}
				});
				deferred.resolve(filteredWatched);
				console.log("FilteredWatched", filteredWatched);
			});
			return deferred.promise;
		};//--end return function
});