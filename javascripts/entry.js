require.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'q': '../lib/bower_components/q/q',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../lib/bower_components/firebase/firebase',
    'omdb': '../lib/node_modules/omdb-client/dist/omdb-client.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

require(
  
  ["jquery", "bootstrap", "login-app", "omdb"], 
  function(_$_, bootstrap, loginapp, omdb) {

    /*
      You can choose to use the REST methods to interact with
      Firebase, or you can use the Firebase API with event
      listeners. It's completely up to each team.

      If you choose the former, I created two boilerplate modules
      named `potential-mates.js`, and `add-favorite.js`.
     */


    $("#find-movies-button").click(function() {
      console.log("you clicked");
      $("#find-movies-modal").modal("show");
    });

    $("#search-my-movies-button").click(function() {
      console.log("you clicked");
      $("#search-my-movies-modal").modal("show");
    });

    $("#search-all-movies-button").click(function() {
    console.log("you clicked on find movies!");

          var params = {
          title: 'Terminator',
          year: 2012
          };
          omdb.get(params, function(err, data) {
          console.log("data", data.image);
      });

    });

  }
);
