define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var firebase = require("firebase");

	//deletes movie from user's firebase collection
	return function (userid, movieID) {
		var ref = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid + "/" + movieID);
			ref.update({
		      "deleted" : true
		    });
		};
});
