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
  var searchAll = require("search-all");

  var viewState = "all";
  var currentUserID = userLogin.getUid();

  // console.log("currentUserID", currentUserID);

  // var fbListenerRef = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + currentUserID);

  // fbListenerRef.on("value", function() {
  //   console.log("fb value change!!");
  // })


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

        viewState = "searchResults";

        var movieIDarray = [];
        var searchedData;

        var userid = userLogin.getUid();
        var value = $("#search-field").val();

        searchAll(userid, value);

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

          if (viewState === "searchResults") {
            searchAll(userid, value);
          };

          // if (viewState === "all") {
          //   populateAllPage(userid)
          //     .then(function(data) {
          //       var allUserMovies = Object.keys( data ).map(function(key) { return data[key];});
          //       var sortedResults = _.sortBy(allUserMovies, "Title");
          //       getposter.requestData(sortedResults);
          //     });
          // };

          

        })
        .fail(function(error){
          console.log("it's fucked", error);
        });
    }); // end body click function


  //********************** STAR RATING ***********************
  $(document).on('rating.change', function(event, starValue) {

    console.log("starValue", starValue);
    console.log("event.target", event.target);

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
    var value = $("#search-field").val();
    console.log("movieID", movieID);
    console.log("userid", userid);
     
    //on click, app checks current view state and repopulates
    //current page accordingly:  
    if (viewState === "all") {  
      watchedButton(userid, movieID);
      populateAllPage(userid)
        .then(function(data) {
          var allUserMovies = Object.keys( data ).map(function(key) { return data[key];});
          var sortedResults = _.sortBy(allUserMovies, "Title");
          getposter.requestData(sortedResults);
        });
      };

    if (viewState === "searchResults") {
      watchedButton(userid, movieID);
      searchAll(userid, value);
    };

    if (viewState === "unwatched") {
      watchedButton(userid, movieID);
      unwatchedMovies(userid)
        .then(function(data) {
          var sortedResults = _.sortBy(data, "Title");
          getposter.requestData(sortedResults);
        });
    };
  });//--end watched button



  //----- DELETE MOVIE FROM COLLECTION ------//
  $(document).on('click', '.glyphicon-remove', function(event) {
    console.log("you clicked remove");
    target movie and user ids
    var thisMovie = event.target.id;
    console.log("this movie", thisMovie);
    var userID = userLogin.getUid();
    var value = $("#search-field").val();
    console.log("this user", userID);

    //on click, app checks current view state and repopulates
    //current page accordingly: 
    if (viewState === "all") {  
      //delete movie from firebase
      deleteMovie(userID, thisMovie);
      populateAllPage(userID)
        .then(function(data) {
          var allUserMovies = Object.keys( data ).map(function(key) { return data[key];});
          var sortedResults = _.sortBy(allUserMovies, "Title");
          getposter.requestData(sortedResults);
        });
      };

    if (viewState === "searchResults") {
     //delete movie from firebase
      deleteMovie(userID, thisMovie);
      searchAll(userID, value);
    };

    if (viewState === "unwatched") {
      //delete movie from firebase
      deleteMovie(userID, thisMovie);
      unwatchedMovies(userID)
        .then(function(data) {
          var sortedResults = _.sortBy(data, "Title");
          getposter.requestData(sortedResults);
        });
      };

    if (viewState === "watched") {
      //delete movie from firebase
      deleteMovie(userID, thisMovie);
      watchedMovies(userID)
        .then(function(data) {
          var sortedResults = _.sortBy(data, "Title");
          getposter.requestData(sortedResults);
        });
      };

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
      viewState = "all";
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

      viewState = "watched";

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
      viewState = "unwatched"
      console.log("clicked unwatched");
      var userid = userLogin.getUid();
      unwatchedMovies(userid)
        .then(function(data) {
          var sortedResults = _.sortBy(data, "Title");
          getposter.requestData(sortedResults);
        });
    });
    //--favorites page
    $("#favorites-filter-button").click(function() {
      console.log("clicked favorites");
      var userid = userLogin.getUid();
      favoriteMovies(userid)
        .then(function(data) {
          var sortedResults = _.sortBy(data, "Title");
          getposter.requestData(sortedResults);
        });
    });






}); // end define function























