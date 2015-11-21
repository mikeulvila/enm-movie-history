define(function(require) {
	var $ = require("jquery");
	var firebase = require("firebase");


function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $("#main-page").show();
	$("#login-page").hide();
  } else {
    console.log("User is logged out");
  }
}
// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
ref.onAuth(authDataCallback);

});