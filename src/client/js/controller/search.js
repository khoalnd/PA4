app.controller("searchCtrl", ['$scope', '$rootScope', '$http', 'firebase', '$firebaseObject', searchCtrl]);
function searchCtrl($scope, $rootScope, $http, firebase, $firebaseObject) {
	function init() {
		$scope.listLyrics = [];
		var url = new URL(window.location.href.replace("#!", ""));
		var songKey = url.searchParams.get("keywords");

		firebase.orderByChild('SongName').equalTo(songKey).once("value", (snap) => {
			snap.forEach((childSnap) => {
				$scope.listLyrics.push({
					key: childSnap.key,
					data: childSnap.val(),
				});
			});
        });
	}

	init();

	// $scope.complete = function(string){  
 //       	$scope.hidethis = false;  
 //       	var output = [];  
 //       	angular.forEach($scope.listLyrics, function(itemp){  
 //            if(itemp.data.toLowerCase().indexOf(string.toLowerCase()) >= 0)  
 //            {  
 //                 output.push(txtSearch);  
 //            }  
 //       	});  
 //       	$scope.filterCountry = output;  
 //  	}

  	// $scope.fillTextbox = function(string){  
   //         $scope.txtSearch = string;  
   //         $scope.hidethis = true;  
   //  }  

	$scope.search = function() {
		window.top.location = '#!/search?keywords=' + $scope.txtSearch;
	}


}