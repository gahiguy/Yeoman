'use strict';

/**
 * @ngdoc function
 * @name yeomanTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanTestApp
 */
var app = angular.module('yeomanTestApp');

 app.controller('MainCtrl', function ($scope, $log, service) {
	 $scope.persons = [];
	 
	 $scope.submit = function(user){
		 $log.log(user);
		 service.save(user, function(response){
			 service.query(function(response) {
				 // $log.log(response);
				 if(response.person !== undefined)
				 {
					 if(response.person.length > 1)
						 $scope.persons = response.person;
					 else
						 $scope.persons.push(response.person);
				 }
			});
		 });
	 };
	 
	 service.query(function(response) {
		 // $log.log(response);
		 if(response.person !== undefined)
		 {
			 if(response.person.length > 1)
				 $scope.persons = response.person;
			 else
				 $scope.persons.push(response.person);
		 }
	});
	 
  });
 
 app.factory('service',function($resource){
	 return $resource('/rest/humain/:id', {id:'@id'}, {
		 query: {method: 'GET', isArray: false}
	 });
 });
