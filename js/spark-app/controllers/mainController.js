//Controller establishes data-binding between the model and the view
app.controller("mainController", function($scope, $http){
	
	$scope.apiKey = "WfS8an7aqWaOjYzGnPIfCAJkMi1wd0Us";
	//array to hold processed results
	$scope.results = [];
	$scope.filterText = null;
	$scope.availableFields = [];
    $scope.fieldFilter = null;
    //takes field value and sets $scope.fieldFilter to the value
    $scope.setFieldFilter = function(field) {
    	$scope.fieldFilter = field;
	}
    $scope.init = function() {
        
        /* BEHANCE api call *//**/
        $http.jsonp('http://behance.net/v2/projects?api_key=' + $scope.apiKey + '&page=1&callback=JSON_CALLBACK')
        .success(function(data) {
        	
        	console.log(data.projects); //============================
        	
			//Loop through each projects, push it to the results array
			angular.forEach(data.projects, function(projects, index){
                
                $scope.results.push(projects);
				console.log($scope.results); //returns array of objects (projects)
                
                //Loop through each field for this project
                angular.forEach(projects.field, function(field, index){
                    //Only add to the availableFields array if it doesn't already exist
                    var exists = false;
                    angular.forEach($scope.availableFields, function(avField, index){
                        if (avField == field) {
                            exists = true;
                        }
                    });
                    if (exists === false) {
                        $scope.availableFields.push(field);
                    }
                });
            });
			
		})
        .error(function(error) {
 
        });
       
    };

});
//custom filter: input provided by default and is the data that ng-repeat is processing, field is a value to pass in
app.filter('isField', function() {
    return function(input, field) {
        if (typeof field == 'undefined' || field == null) {
            return input;
        } else {
            var out = [];
            for (var a = 0; a < input.length; a++){
                for (var b = 0; b < input[a].projects.fields.length; b++){
                    if(input[a].projects.fields[b] == field) {
                        out.push(input[a]);
                    }
                }
            }
            return out;
        }
    };
});

/*****  FIREBASE CODE --- WORK IN PROGRESS  *****/
/*
angular.module("SparkApp", ["firebase"]).controller(
  "SparkApp", ["$scope", "angularFireCollection", "angularFireAuth",
  function($scope, angularFireCollection, angularFireAuth) {
    var url = "https://mdd1310.firebaseio.com/";
    angularFireAuth.initialize(url, {scope: $scope, name: "user"});

    var ref = new Firebase(url);
    $scope.comments = angularFireCollection(ref.limit(10));

    $scope.login = function() {
      angularFireAuth.login('password', {
		  email: '<email@domain.com>',
		  password: '<password>');
    }
    $scope.logout = function() {
      angularFireAuth.logout();
    }
  }
]);
*/