define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var _ = require("lodash");
	var firebase = require("firebase");

	var deferred = Q.defer();

	return function (userid, searchVal) {
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid);
			ref.on("value", function(snapshot) {
				deferred.resolve(snapshot.val());
			});
			return deferred.promise;
		};
});













// var collectionsRef = snapshot.val();
// 				// console.log("collectionsRef", collectionsRef);
// 				// console.log("searchval", searchVal);
// 				var filtered = _.filter(collectionsRef, function(obj) {
// 					if (_.includes(obj.title.toLowerCase(), searchVal.toLowerCase())) {
// 						console.log("obj includes", obj.title);
// 						return obj;
// 					}
// 				});
// 				console.log("filtered list", filtered);
// 				require(['hbs!../templates/searched-my-movies'], function(movieTemplate) {
//                   $("#template-container").append(movieTemplate(filtered));
//                 });	