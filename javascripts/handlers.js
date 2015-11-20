define(function(require) {
	var $ = require("jquery");
	var getOMDB = require("get-OMDB-data");

  var authentication = require("authentication");
  var userLogin = require("existing-user-login");

  // button to register new user
  $("#register-button").click(function(event) {
    event.preventDefault();
    var userEmail = $("#user-email").val();
    var userPassword = $("#user-password").val();
    authentication.createNewUser(userEmail, userPassword);
  });

  // button to login existing user
  $("#login-button").click(function(event) {
    event.preventDefault();
    var userEmail = $("#user-email").val();
    var userPassword = $("#user-password").val();
    userLogin.logUserIn(userEmail, userPassword);
  });

  // button to log out
  $("#logout-button").click(function(event) {
    userLogin.logUserOut();
  });

	// NAV BAR search button handlers
	$("#find-movies-button").click(function() {
      console.log("you clicked");
      $("#find-movies-modal").modal("show");
      
    });

    $("#search-my-movies-button").click(function() {
      console.log("you clicked");
      $("#search-my-movies-modal").modal("show");
    });

    $("#find-movies-search").keypress(function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });

    $("#submit-find-button").click(function() {
    	var value = $("#find-movies-search").val();
    	console.log("val", value);
    	getOMDB.requestData(value)
    		.then(function(data) {
    			console.log("promise data", data);
    		});
    });

});