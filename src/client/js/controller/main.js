app.controller("ctrlMain", ['$scope', '$rootScope', '$http', 'firebase', '$firebaseObject', ctrlMain]);
function ctrlMain($scope, $rootScope, $http, firebase, $firebaseObject) {
	function init() {
		//Load file html
        $('.popular-lyrics-container').load('./view/popular_lyrics.html');
        $('.latestnews').load('./view/latest_news.html');

        //Load data từ Firebase
		$scope.listLyrics = $firebaseObject(firebase);
	}

	init();

	$scope.test = () => {
		alert('as');
	}
}