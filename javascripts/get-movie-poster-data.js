define(function(require) {
	var $ = require("jquery");
	var Q = require("q");


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

				// var searchURL = "http://img.omdbapi.com/?i=" + id + "&apikey=7c212437";

				// var templateObj = {
				// 					url: searchURL, 
				// 					imdbid: id
				// 				  };

		
			});
			require(['hbs!../templates/find-movies-results'], function(movieTemplate) {
                  $("#template-container").html(movieTemplate({movies:templateArray}));
                });	

			console.log("templateArray", templateArray);
		}
	};
});