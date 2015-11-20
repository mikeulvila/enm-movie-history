define(function(require) {
	var $ = require("jquery");
	var Q = require("q");

	var deferred = Q.defer();

	return {
		requestData: function(searchValue) {

			var parsedSearch = searchValue.replace(" ", "%");
			var searchURL = "http://www.omdbapi.com/?t=" + parsedSearch + "&";
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