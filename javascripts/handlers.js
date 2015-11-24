define(function(require) {
	var $ = require("jquery");
	var getposter = require("get-movie-poster-data");
  var getmoviedata = require("get-movie-data");
  var getaddedmoviedata = require("get-added-movie-data");
  var addMovieToFirebase = require("add-movie-to-firebase");
  var searchMyMovies = require("search-my-movies");
  var filterSearch = require("combine-firebase-api-data");
  var authentication = require("authentication");
  var userLogin = require("existing-user-login");
  var _ = require("lodash");
  var populateAllPage = require("get-users-movie-collection");
 


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
            console.log("data", data);
            // if there are no movies in the users database, just get movies from API
            if (data === null) {
              getmoviedata.requestData(value)
              .then(function(data1) {
                console.log("data1", data1);
                $.each(data1.Search, function(index, value){
                movieIDarray.push(value.imdbID);
                }); //--end $.each
                getposter.requestData(movieIDarray);
              });
            } else {
              searchedData = Object.keys( data ).map(function(key) { return data[key];});
              console.log("searchedData", searchedData);
              //searching API for all movies that contain search value
              getmoviedata.requestData(value)
            .then(function(data) {
              var apiData = data.Search;
              console.log("API data ---", apiData);
              var combinedArray = filterSearch(searchedData, apiData);
              console.log("combinedArray", combinedArray);

              var sortedResults = _.sortBy(combinedArray, "Title");
              console.log("sortedResults", sortedResults);

              // $.each(combinedArray, function(index, value){
              //   console.log("each function -- ", value.imdbID);
              //   movieIDarray.push(value.imdbID);
              //   console.log("movieIDarray", movieIDarray);
              // }); //--end $.each
              getposter.requestData(sortedResults);
              
              }); //--end 2nd .then statement
            } //--end else

            
          }); //--end 1st .then statement

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
            "Title": data.Title,
            "Year": data.Year,
            "Actors": data.Actors,
            "Watched": false,
            "Rating": 0,
            "url" : posterURL,
            "imdbID" : data.imdbID
          };
          addMovieToFirebase.pushData(userid, addedMovieObj);
        })
        .fail(function(error){
          console.log("it's fucked", error);
        });
    }); // end body click function

//********* NAV LINK EVENT HANDLERS ******

    $("#all-filter-button").click(function() {
      var userid = userLogin.getUid();
      populateAllPage(userid); //calls "get-users-movie-collection" module
    });


}); // end define function























