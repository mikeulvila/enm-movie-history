define(function(require) {


	return function movieGetter(firebaseArray, apiArray) {

		var titlesArray = firebaseArray.map(function(movie) {
			return movie.Title;
		});

		var filteredArray = apiArray.filter(function(elFromAPI) {
			    if (titlesArray.indexOf(elFromAPI.Title) === -1) {
			       return true;
			    } else {
			    	return false;
			    }
			  });
		return firebaseArray.concat(filteredArray);
	};
});

