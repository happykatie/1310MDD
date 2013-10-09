app.controller("mainController", function($scope, $http){
	
	$scope.apiKey = "WfS8an7aqWaOjYzGnPIfCAJkMi1wd0Us";
	$scope.results = [];
    $scope.init = function() {
        
        /* BEHANCE */
        $http.jsonp('http://behance.net/v2/projects?api_key=' + $scope.apiKey + '&callback=JSON_CALLBACK')
        .success(function(data) {
        
            console.log(data);
			/**/	 
			
			var name = data.projects[0].name;
			console.log(name);
			
            //For each project, get all the project data
            angular.forEach(data, function(projects, index){
            	
            	var name = projects.name;
            	console.log(name);
                $scope.results.push(projects);
                
                
            });
		})
        .error(function(error) {
 
        });
       
    };

});

