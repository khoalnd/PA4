app.directive('ckEditor', function () {
return {
    require: '?ngModel',
    link: function (scope, elm, attr, ngModel) {
      var ck = CKEDITOR.replace(elm[0]);
      if (!ngModel) return;
      ck.on('instanceReady', function () {
        ck.setData(ngModel.$viewValue);
      });
      function updateModel() {
        scope.$apply(function () {
          ngModel.$setViewValue(ck.getData());
        });
      }
      ck.on('change', updateModel);
      ck.on('key', updateModel);
      ck.on('dataReady', updateModel);

      ngModel.$render = function (value) {
        ck.setData(ngModel.$viewValue);
      };
    }
  };
});

app.controller("ctrlLyrics", ['$sce', '$scope', '$rootScope', '$http', 'firebase', '$firebaseObject', ctrlLyrics]);


function ctrlLyrics($sce, $scope, $rootScope, $http, firebase, $firebaseObject) {
	function init() {
		if (window.location.href.indexOf('SongId') > 0) {
			var url = new URL(window.location.href.replace("#!", ""));
			var songId = url.searchParams.get("SongId");

	        firebase.child(songId).once("value", (snap) => {
				$scope.iSong = snap.val();
				$scope.iSong.Lyrics=$sce.trustAsHtml($scope.iSong.Lyrics);
	        	$scope.$digest();
	        	$scope.$apply();
	        });
		}
	}

	init();

	$scope.clear = function() {
		$scope.iTitle = '';
		$scope.iSinger = '';
		$scope.iAlbums = '';
		$scope.iPoster = '';
		$scope.iLyrics = '';
	}

	$scope.submit = function() {
		var obj = {
			SongName: $scope.iTitle,
			Singer: $scope.iSinger,
			AlbumName: $scope.iAlbums,
			Poster: $scope.iPoster,
			Lyrics: $scope.iLyrics,
		}

		firebase.push(obj).then(() => {
			$scope.clear();
			alert('Submit Lyrics Success');
		});
	}

	$(function(){
		let position = $('.marginb40').width();
        $('.social').css('right', $(window).width() - position);
        $('html, body').animate({
			scrollTop: $('#index').offset().top
		}, 200);
    });
}