'use strict';

/* Controllers */
//Controller establishes data-binding between the model and the view

angular.module('SparkApp.controllers', [])
	.controller('LoginCtrl', ['$scope', 'loginService', function($scope, loginService) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;

      $scope.login = function(callback) {
         $scope.err = null;
         loginService.login($scope.email, $scope.pass, '/account', function(err, user) {
            $scope.err = err||null;
            typeof(callback) === 'function' && callback(err, user);
         });
      };

      $scope.createAccount = function() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.pass !== $scope.confirm ) {
            $scope.err = 'Passwords do not match';
         }
         else {
            loginService.createAccount($scope.email, $scope.pass, function(err, user) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  // must be logged in before I can write to my profile
                  $scope.login(function(err) {
                     if( !err ) {
                        loginService.createProfile(user.id, user.email);
                     }
                  });
               }
            });
         }
      };
   }]) //end loginctrl
   

   .controller('ListCtrl', ['$scope', 'FBURL', 'angularFire', '$http', function($scope, FBURL, angularFire, $http) {
      angularFire(FBURL+'/syncedValue', $scope, 'syncedValue', '');
      
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
   }])


   .controller('MyCtrl2', ['$scope', 'FBURL', 'Firebase', 'angularFireCollection', function($scope, FBURL, Firebase, angularFireCollection) {
      $scope.newMessage = null;

      // constrain number of messages by passing a ref to angularFire
      var ref = new Firebase(FBURL+'/messages').limit(10);
      // add the array into $scope
      $scope.messages = angularFireCollection(ref);

      // add new messages to the list
      $scope.addMessage = function() {
         if( $scope.newMessage ) {
            $scope.messages.add({text: $scope.newMessage});
            $scope.newMessage = null;
         }
      };
   }])


.controller('AccountCtrl', ['$scope', 'loginService', 'angularFire', 'FBURL', '$timeout', function($scope, loginService, angularFire, FBURL, $timeout) {

      angularFire(FBURL+'/users/'+$scope.auth.id, $scope, 'user', {});

      $scope.logout = function() {
         loginService.logout('/login');
      };

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      function reset() {
         $scope.err = null;
         $scope.msg = null;
      }

      $scope.updatePassword = function() {
         reset();
         loginService.changePassword(buildPwdParms());
      };

      $scope.$watch('oldpass', reset);
      $scope.$watch('newpass', reset);
      $scope.$watch('confirm', reset);

      function buildPwdParms() {
         return {
            email: $scope.auth.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.msg = 'Password updated!';
               }
            }
         }
      }

   }]);   
   
/*
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
        
       	BEHANCE api call 
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
*/
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