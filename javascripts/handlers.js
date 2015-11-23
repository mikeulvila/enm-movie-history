define(function(require) {
	var $ = require("jquery");
	var getposter = require("get-movie-poster-data");
  var getmoviedata = require("get-movie-data");
  var getaddedmoviedata = require("get-added-movie-data");
  var addMovieToFirebase = require("add-movie-to-firebase");
  var searchMyMovies = require("search-my-movies");


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

  	// -------- FIND MOVIES Nav button, search input in modal and submit search value ------//

    // preventing default form submit on input field
    $("#search-field").keypress(function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();


        var movieIDarray = [];

        var userid = userLogin.getUid();
        var value = $("#search-field").val();

        console.log("value----", value);


        var searchedData;

        searchMyMovies(userid, value)
          .then(function(data) {
            // searchedData will equal movies user has added
            searchedData = data;
            console.log("searchedData", data);
            //searching API for all movies that contain search value
            getmoviedata.requestData(value)
          .then(function(data) {
            console.log("API data ---", data.Search);
            // var filtered = _.filter(data, function(obj) {
            //   if (_.includes(obj.title.toLowerCase(), searchVal.toLowerCase())) {
            //     console.log("obj includes", obj.title);
            //     return obj;
            //   }
            // });

            console.log("get movie data", data);
            console.log("data search", data.Search);
            $.each(data.Search, function(index, value){
              console.log("each function -- ", value.imdbID);
              movieIDarray.push(value.imdbID);
              console.log("movieIDarray", movieIDarray);
            });
            getposter.requestData(movieIDarray);
            
          });

            
          });

      }
    });















    $("body").on("click", ".add-movie-to-collection", function(event) {
      console.log("this poster", $(this).attr('poster'));
      var userid = userLogin.getUid();
      var posterURL = $(this).attr('poster');
      getaddedmoviedata.requestData(this.id)
        .then(function(data){
          console.log("in-depth data", data);
          var addedMovieObj = {
            "title": data.Title,
            "year": data.Year,
            "actors": data.Actors,
            "watched": false,
            "rating": 0,
            "url" : posterURL
          };
          addMovieToFirebase.pushData(userid, addedMovieObj);
        })
        .fail(function(error){
          console.log("it's fucked", error);
        });
    }); // end body click function

}); // end define function




















