define(function(require) {
	var $ = require("jquery");
	var firebase = require("firebase");
	var userLogin = require("existing-user-login");

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
		createNewUser: function(newEmail, newPassword) {
			console.log("got in");
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
			ref.createUser({
			  email    : newEmail,
			  password : newPassword
			}, function(error, authData) {
			  if (error) {
			    console.log("Error creating user:", error.message);
			    //alert object function
			    showAlert({
                	title: error.code,
                	detail: error.message,
                	className: 'alert-danger'
            	});
			  } else {
			    console.log("Successfully created user account with uid:", authData.uid);
			    // create object and new firebase ref to update database with user info
			    var uid = authData.uid;
			    var newfbRef = new Firebase("https://movie-history-enm.firebaseio.com/users/" + uid);
			    var userData = {
			    	"user": uid,
			    	"email": newEmail,
			    	"password": newPassword
			    };
			    // sets new user data object to firebase
			    newfbRef.set(userData);
			    // immediately logs user in on signup
				userLogin.logUserIn(newEmail, newPassword);
			  }
			});
		}
	};
});