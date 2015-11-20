define(function(require) {
	var $ = require("jquery");
	var getOMDB = require("get-OMDB-data");

	// NAV BAR search button handlers
	$("#find-movies-button").click(function() {
      console.log("you clicked");
      $("#find-movies-modal").modal("show");
      
    });

    $("#search-my-movies-button").click(function() {
      console.log("you clicked");
      $("#search-my-movies-modal").modal("show");
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