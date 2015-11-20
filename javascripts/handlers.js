define(function(require) {
	var $ = require("jquery");
	var getposter = require("get-movie-poster-data");
  var getmoviedata = require("get-movie-data");


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

    // submit find button on find movies modal
    $("#submit-find-button").click(function() {
    	var value = $("#find-movies-search").val();
    	console.log("val", value);
      var movieIDarray = [];

      getmoviedata.requestData(value)
        .then(function(data) {
          console.log("get movie data", data);
          console.log("data search", data.Search);
          $.each(data.Search, function(index, value){
            console.log("each function -- ", value.imdbID);
            movieIDarray.push(value.imdbID);
            console.log("movieIDarray", movieIDarray);
          });
          getposter.requestData(movieIDarray);
        });
          

          // for (var obj in data.Search) {
          //   console.log("obj", obj);
          //   getposter.requestData(obj.imdbID)
          //     .then(function(poster) {
                
                
          //     });
          // }

        
        //   .then(function(data) {
        //     console.log("promise data", data);
      		// });
    });

});





