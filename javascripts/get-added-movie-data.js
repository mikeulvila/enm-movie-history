define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	//var login = require("existing-user-login");


	return {

		requestData: function(id) {

			var deferred = Q.defer();
	
			var searchURL = "http://www.omdbapi.com/?i=" + id + "&";
			$.ajax({
			url: searchURL
			}).done(function(data) {
				console.log("it's done");
				console.log("done data", data);
				deferred.resolve(data);
			})
			.fail(function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		},

		getUsersAddedMovies: function(email) {

			var userEmail = email;
			console.log("user email", userEmail);

			userEmail = userEmail.replace("@", "_");
			userEmail = userEmail.replace(".", "_");
			console.log("user email replaced", userEmail);

			var usersCollectionsRef = "https://movie-history-enm.firebaseio.com/collections/" + userEmail + ".json/";

			$.ajax({
			url: usersCollectionsRef
			}).done(function(data) {
				console.log("got your saved movies!");
				console.log("saved movies: ", data);
				require(['hbs!../templates/my-movies-page'], function(myMoviesTemplate) {
                  $("#my-movies-page").html(myMoviesTemplate({data}));
                });

				userFbRef = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userEmail)

				userFbRef.on("value", function(snapshot) {
				console.log("snapshot fired!");
				var userMovies = snapshot.val();
				console.log("userMovies", userMovies);
				require(['hbs!../templates/my-movies-page'], function(myMoviesTemplate) {
                  $("#my-movies-page").html(myMoviesTemplate({userMovies}));
                });
				});

			})
			.fail(function(error) {
				console.log(error);
			});


			

		}
		
	};
});