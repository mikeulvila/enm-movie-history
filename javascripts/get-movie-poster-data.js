define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var stars = require("stars");


	return {
		requestData: function(array) {

			var templateArray = array.map(function(obj) {
				// console.log("combinedArray obj", obj);
				if (obj.url) {
					return obj;
				} else {
					obj.url = "http://img.omdbapi.com/?i=" + obj.imdbID + "&apikey=7c212437";
					return obj;
				}
		
			});
			require(['hbs!../templates/find-movies-results'], function(movieTemplate) {
                  $("#template-container").html(movieTemplate({movies:templateArray}));
                  $(".rating").rating();
                });	

			console.log("templateArray", templateArray);
		}
	};
});