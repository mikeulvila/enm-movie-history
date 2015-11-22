define(function(require) {
	var $ = require("jquery");
	var getposter = require("get-movie-poster-data");
  var getmoviedata = require("get-movie-data");
  
  var addMovieToFirebase = require("add-movie-to-firebase");
  var getaddedmoviedata = require("get-added-movie-data");


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

    //show my movies page on click:

    $("#my-movies-page-button").click(function() {
      console.log("you want to go to the my movies page!");
      $("#my-movies-page").show();
      $("#template-container").hide();

    });


    // submit find button on find movies modal
    $("#submit-find-button").click(function() {
    	var value = $("#find-movies-search").val();
    	console.log("val", value);
      var movieIDarray = [];

      $("#template-container").html("");

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
        $("#search-my-movies-modal").modal("hide");
        $("#template-container").show();
        $("#my-movies-page").hide();
    }); // end submit-find-button

    //add movie button adds given movie to firebase collection:

    $("body").on("click", ".add-movie-to-collection", function(event) {
      console.log("this id", this.id);
      console.log("this", event.target.parentElement.id);

      var addedMoviePoster = event.target.parentElement.id;

      getaddedmoviedata.requestData(this.id)
        .then(function(data){
          console.log("in-depth data", data);

          var addedMovieObj = {
            "title": data.Title,
            "year": data.Year,
            "actors": data.Actors,
            "watched": false,
            "rating": 0,
            "poster": addedMoviePoster
          };


          addMovieToFirebase.pushData(addedMovieObj);


        })
        .fail(function(error){
          console.log("it's fucked", error);
        });
    }); // end body click function

}); // end define function




















