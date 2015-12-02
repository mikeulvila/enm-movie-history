define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var _ = require("lodash");
	var firebase = require("firebase");
	var searchMyMovies = require("search-my-movies");
	var getmoviedata = require("get-movie-data");
	var getposter = require("get-movie-poster-data");
	var filterSearch = require("combine-firebase-api-data");

	return function(userid, value) {
		searchMyMovies(userid, value)
          .then(function(data) {
            // searchedData will equal movies user has added
            console.log("data", data);
            // if there are no movies in the users database, just get movies from API
            if (data === null) {
              getmoviedata.requestData(value)
              .then(function(data1) {
                console.log("data1", data1);
                $.each(data1.Search, function(index, value){
                movieIDarray.push(value.imdbID);
                }); //--end $.each
                console.log("movieIDarray", movieIDarray);
                getposter.requestData(movieIDarray, viewState);
              });
            } else {
              searchedData = Object.keys( data ).map(function(key) { return data[key];});
              console.log("searchedData", searchedData);
              //searching API for all movies that contain search value
              getmoviedata.requestData(value)
              .then(function(data) {
                var apiData = data.Search;
                console.log("API data ---", apiData);
                if (apiData === undefined) {
                  console.log("YOU'RE GOING TO GET AN ERROR");
                  $("#no-search-results").show();
                }

                var combinedArray = filterSearch(searchedData, apiData);
                console.log("combinedArray", combinedArray);

                var sortedResults = _.sortBy(combinedArray, "Title");
                console.log("sortedResults", sortedResults);

                getposter.requestData(sortedResults);
                
              }); //--end 2nd .then statement
            } //--end else
            
          }); //--end 1st .then statement


	};
	

});