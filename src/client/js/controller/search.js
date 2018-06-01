"use strict";
app.controller("searchCtrl", ['$scope', '$rootScope', '$http', 'firebase', '$firebaseObject', searchCtrl]);
function searchCtrl($scope, $rootScope, $http, firebase, $firebaseObject) {
	function init() {
		$scope.listLyrics = [];
		$scope.listAutoComplete = [];

		var url = new URL(window.location.href.replace("#!", ""));
		var songKey = url.searchParams.get("keywords");

		firebase.orderByChild('SongName').once("value", (snap) => {
			snap.forEach((childSnap) => {
				if (childSnap.val().SongName == songKey) {
					$scope.listLyrics.push({
						key: childSnap.key,
						data: childSnap.val(),
					});
				}

				$scope.listAutoComplete.push({
					key: childSnap.key,
					data: childSnap.val(),
				});
			});
        });
	}

	init();

	$scope.complete = function(string) {
		$scope.nHide = false;
        var output = [];

	    angular.forEach($scope.listAutoComplete, function(iTemp) {
	        if(iTemp.data.SongName.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
	        	output.push(iTemp.data.SongName);
	        }
	    });

	    $rootScope.filterLyrics = output;
   	}

	$scope.search = function(string) {
		$scope.nHide = true;
		
		if (string) {
			$scope.txtSearch = string;
		}

		window.top.location = '#!/search?keywords=' + $scope.txtSearch;
	}
}