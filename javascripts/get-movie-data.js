define(function(require) {
	var $ = require("jquery");
	var Q = require("q");

	// this function searches comprehensive data API for all
	// movies containing search value (eg. search of 'christmas'
	// returns all movies with 'christmas' in the title)

	return {
		requestData: function(searchValue) {

			var deferred = Q.defer();
			//var parsedSearch = searchValue.replace(" ", "%");
			// new api does not need % in search
			var parsedSearch = searchValue;
			var searchURL = "http://www.omdbapi.com/?s=" + parsedSearch + "&";
			$.ajax({
			url: searchURL
			}).done(function(data) {
				console.log("it's done");
				deferred.resolve(data);
			})
			.fail(function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
	};
});
