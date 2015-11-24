define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var _ = require("lodash");
	var firebase = require("firebase");


	return function (userid) {
	
	$.ajax({
		url:"https://movie-history-enm.firebaseio.com/collections/" + userid + ".json/",
		error: function (a, b, c) {
			console.log(a, b, c);
		}
	}).done(function(userMovies) {
					console.log("userMovies", userMovies);
					require(['hbs!../templates/find-movies-results'], function(movieTemplate) {
	                  $("#template-container").html(movieTemplate({movies:userMovies}));
	                });	

			});
		};
});

