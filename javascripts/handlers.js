define(function(require) {
	var $ = require("jquery");
  // var Handlebars = require("handlebars");
  var bootstrap = require("bootstrap");
	var getposter = require("get-movie-poster-data");
  var getmoviedata = require("get-movie-data");
  var getaddedmoviedata = require("get-added-movie-data");
  var addMovieToFirebase = require("add-movie-to-firebase");
  var searchMyMovies = require("search-my-movies");
  var filterSearch = require("combine-firebase-api-data");
  var authentication = require("authentication");
  var userLogin = require("existing-user-login");
  var _ = require("lodash");
  var starRating = require("star-rating");
  var populateAllPage = require("get-users-movie-collection");
  var watchedButton = require("watched-button");
  var watchedMovies = require("search-watched-movies");
  var unwatchedMovies = require("search-unwatched-movies");
  var favoriteMovies = require("search-favorite-movies");
  var deleteMovie = require("delete-movie-from-my-collection");
  var slider = require("slider");

  //SLIDER
  $("#ex6").slider();
  $("#ex6").on("slide", function(slideEvt) {
    console.log("slide value", slideEvt.value);
    var userid = userLogin.getUid();
      favoriteMovies(userid, slideEvt.value)
        .then(function(data) {
          var sortedResults = _.sortBy(data, "Title");
          getposter.requestData(sortedResults);
        });
    $("#ex6SliderVal").text(slideEvt.value);
  });

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
      if (event.keyCode === 13) { // if user presses 'enter'
        event.preventDefault(); // prevents form from submitting

        var movieIDarray = [];
        var searchedData;

        var userid = userLogin.getUid();
        var value = $("#search-field").val();

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

      }
    });

  //************ HIDE WARNING ****************
  $("#close-warning").click(function(){
    $("#no-search-results").hide();
  });


  //************ ADD MOVIE TO COLLECTION ******************

    $("body").on("click", ".add-movie-to-collection", function(event) {
      console.log("this poster", $(this).attr('poster'));
      var userid = userLogin.getUid();
      var posterURL = $(this).attr('poster');
      var value = $("#search-field").val();
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
          addMovieToFirebase.pushData(userid, data.imdbID, addedMovieObj);

          //gesture on "add" button fires "search" function again
          //code below is duplicated -- should refactor to call a module.
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

                getposter.requestData(sortedResults);
                
              }); //--end 2nd .then statement
            } //--end else
            
          }); //--end 1st .then statement

        })
        .fail(function(error){
          console.log("it's fucked", error);
        });
    }); // end body click function


  //********************** STAR RATING ***********************
  $(document).on('rating.change', function(event, starValue) {

    console.log("event.target", event.target);
    starValue = parseInt(starValue);
    var userid = userLogin.getUid();
    var movieID = event.target.id;
    console.log("movieID", movieID);
    console.log("userid", userid);
    starRating(userid, movieID, starValue);
  });//--end star rating



  //********************** WATCHED BUTTON *******************//
  $(document).on('click', '.watched', function(event) {

    console.log("event.target", event.target);

    var userid = userLogin.getUid();
    var movieID = event.target.id;
    console.log("movieID", movieID);
    console.log("userid", userid);
    watchedButton(userid, movieID);
    watchedMovies(userid)
        .then(function(data) {
          var sortedResults = _.sortBy(data, "Title");
          getposter.requestData(sortedResults);
        });
  });//--end watched button



  //----- DELETE MOVIE FROM COLLECTION ------//
  $(document).on('click', '.glyphicon-remove', function(event) {
    console.log("you clicked remove");
    //target movie and user ids
    var thisMovie = event.target.id;
    console.log("this movie", thisMovie);
    var userID = userLogin.getUid();
    console.log("this user", userID);
    //delete movie from firebase
    deleteMovie(userID, thisMovie);
    //repopulate page with new results
    populateAllPage(userID)
      .then(function(data) {
          var allUserMovies = Object.keys( data ).map(function(key) { return data[key];});
          console.log("allUserMovies", allUserMovies);
          var sortedResults = _.sortBy(allUserMovies, "Title");
          getposter.requestData(sortedResults);
    });
  });//--end delete movie from collection


  // *********MODAL SHOW/HIDE************//
  $(document).on('click', '.img', function(event) {
    var thisthing = event.target;
    var thisModal = $(thisthing).attr("data-target");
    thisModal = '"' + thisModal + '"';
    console.log("this Modal", thisModal);
    $(thisModal).modal("show");
  });//--end img click to show modal




  //********* NAV LINK EVENT HANDLERS ************//
    // --all page
    $("#all-filter-button").click(function() {
      var userid = userLogin.getUid();
      populateAllPage(userid)
        .then(function(data) {
          var allUserMovies = Object.keys( data ).map(function(key) { return data[key];});
          var sortedResults = _.sortBy(allUserMovies, "Title");
          getposter.requestData(sortedResults);
        });
    });
    // --watched page
    $("#watched-filter-button").click(function() {
      console.log("clicked watched");
      var userid = userLogin.getUid();
      watchedMovies(userid)
        .then(function(data) {
          var sortedResults = _.sortBy(data, "Title");
          getposter.requestData(sortedResults);
        });
    });
    //--unwatched page
    $("#unwatched-filter-button").click(function() {
      console.log("clicked unwatched");
      var userid = userLogin.getUid();
      unwatchedMovies(userid)
        .then(function(data) {
          var sortedResults = _.sortBy(data, "Title");
          getposter.requestData(sortedResults);
        });
    });


}); // end define function























