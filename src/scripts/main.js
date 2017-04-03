var apiURL = 'http://www.omdbapi.com/';
var app = angular.module('movies', [])
.controller('movieController', function($scope, $http) {
	var timing;

	if($scope.search === undefined){
      $scope.search = "Ted";
      fetch();
    };

    $scope.change = function(){
    	if(timing){
    		clearTimeout(timing);
    	}
    	timing = setTimeout(fetch,800);
    }

    $scope.update = function(movie){
        $scope.search = movie.Title;
        fetch();
    }
    
    function fetch(){
    	$http.get(apiURL+"?t="+ $scope.search +"&tomatoes=true&plot=full")
    	.success(function(response){
    		$scope.details =  response;
    	});

        $http.get(apiURL+"?s="+$scope.search)
        .success(function(response){
            $scope.related = response;
        });
    }

});