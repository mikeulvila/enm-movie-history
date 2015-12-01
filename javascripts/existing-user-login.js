define(function(require) {
	var $ = require("jquery");
	var firebase = require("firebase");
	var populateAllPage = require("get-users-movie-collection");
	var getposter = require("get-movie-poster-data");

	//alert div
	var alertBox = $('#alert');

	//alert object function
	function showAlert(opts) {
        var title = opts.title;
        var detail = opts.detail;
        var className = 'alert ' + opts.className;

        alertBox.removeClass().addClass(className);
        alertBox.children('#alert-title').text(title);
        alertBox.children('#alert-detail').text(detail);
    }

	return {
		logUserIn: function(userEmail, userPassword) {
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
			// loggedinuser = ref;
			ref.authWithPassword({
			  email    : userEmail,
			  password : userPassword
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			    //alert object function
			    showAlert({
                	title: error.code,
                	detail: error.message,
                	className: 'alert-danger'
            	});
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			    currentUserId = authData.uid;
			    $("#main-page").show();
				$("#login-page").hide();
				populateAllPage(currentUserId)
        			.then(function(data) {
          				var allUserMovies = Object.keys( data ).map(function(key) { return data[key];});
          				var sortedResults = _.sortBy(allUserMovies, "Title");
          				getposter.requestData(sortedResults);
        		});

			  }
			});
		},
		logUserOut: function() {
			// console.log("loggedinuser", loggedinuser);
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
			ref.unauth();
			if (ref.getAuth() === null) {
				console.log("logged out");
				showAlert({
                	title: "You are not logged in",
                	detail: "",
                	className: 'alert'
            	});
				$("#main-page").hide();
				$("#login-page").show();

			}
		},
		getUid: function() {
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
			var authData = ref.getAuth();
			var thisUser = authData.uid;
			return thisUser;
		}
	};
});