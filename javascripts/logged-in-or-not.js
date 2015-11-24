define(function(require) {
	var $ = require("jquery");
	var firebase = require("firebase");
	var populateAllPage = require("get-users-movie-collection");


function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $("#main-page").show();
	$("#login-page").hide();
	populateAllPage(authData.uid);
  } else {
    console.log("User is logged out");
  }
}
// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
ref.onAuth(authDataCallback);

});