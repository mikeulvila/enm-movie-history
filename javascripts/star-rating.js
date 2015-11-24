define(function(require) {
	var firebase = require("firebase");

	return function (userid, movieID, starValue) {

			var userRef = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid );
			var movieRef = userRef.child(movieID);
			movieRef.update({
  				"Rating": starValue
			});
	};//--end return
});//--end define 