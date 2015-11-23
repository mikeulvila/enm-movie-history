define(function(require) {
	var $ = require("jquery");
	var Q = require("q");


	return {
		requestData: function(searchValue) {

			var deferred = Q.defer();
			var parsedSearch = searchValue.replace(" ", "%");
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