define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var _ = require("lodash");
	var firebase = require("firebase");


	return function (userid, searchVal) {
	var deferred = Q.defer();
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid);
			ref.on("value", function(snapshot) {
				var collectionsRef = snapshot.val();
				var filtered = _.filter(collectionsRef, function(obj) {
					if (_.includes(obj.Title.toLowerCase(), searchVal.toLowerCase())) {
						console.log("obj includes", obj.Title);
						return obj;
					}
				});
				console.log("FilteredArray", filtered);
				deferred.resolve(filtered);
			});
			return deferred.promise;
		};
});


