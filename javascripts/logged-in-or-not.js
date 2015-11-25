define(function(require) {
	var $ = require("jquery");
	var firebase = require("firebase");
	var populateAllPage = require("get-users-movie-collection");
  var getposter = require("get-movie-poster-data");
//This module checks to see if the user is already logged in.
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $("#main-page").show();
	  $("#login-page").hide();
    // Get users movie data from firebase by passing their uid.
	  populateAllPage(authData.uid)
      .then(function(data) {
        console.log("GETTING PROMISE BACK", data);
        //Convert Object of Objects to Array of Objects.
        var allUserMovies = Object.keys( data ).map(function(key) { return data[key];});
        console.log("ALLUSERMOVIES", allUserMovies);
        //Sort alphabetically by Title key
        var sortedResults = _.sortBy(allUserMovies, "Title");
        //Populate dom with movie posters using getposter module by passing in the sorted array
        getposter.requestData(sortedResults);
      });
  } else {
    console.log("User is logged out");
  }
} //--end authDataCallback function

// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
ref.onAuth(authDataCallback);

}); //--end define