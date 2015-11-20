define(function(require) {
	var $ = require("jquery");
	var Q = require("q");


	return {
		requestData: function(array) {

			// var deferred = Q.defer();
			array.forEach(function(id) {

				var searchURL = "http://img.omdbapi.com/?i=" + id + "&apikey=7c212437";

				require(['hbs!../templates/find-movies-results'], function(movieTemplate) {
                  $("#template-container").append(movieTemplate(searchURL));
                });	
		
			})
		}
	};
});