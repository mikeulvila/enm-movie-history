define(function(require) {
	var $ = require("jquery");
	var Q = require("q");


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
		}
	};
});