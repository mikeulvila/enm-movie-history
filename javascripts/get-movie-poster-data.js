define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var stars = require("stars");
	var _ = require("lodash");
	// var Handlebars = require("handlebars");


	return {
		requestData: function(array) {

			// if poster obj does not yet contain poster API URL (aka. newly added movie),
			// add poster API URL
			var templateArray = array.map(function(obj) {
				// console.log("combinedArray obj", obj);
				if (obj.url) {
					return obj;
				} else {
					obj.url = "http://img.omdbapi.com/?i=" + obj.imdbID + "&apikey=7c212437";
					return obj;
				}
			});

			// filter out deleted objects
			templateArray = _.filter(templateArray, function(obj) {
				return obj.deleted !== true;
			});

			console.log("templateArray------", templateArray);

			require(['hbs!./templates/searched-my-movies'], function(movieTemplate) {
                  	$("#template-container").html(movieTemplate({movies:templateArray}));
                  	$(".rating").rating();
                });	

			console.log("templateArray", templateArray);
		}
	};
});