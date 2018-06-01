// Initialize Firebase
var config = {
    apiKey: "AIzaSyAU-f3yMZzcW6ehkX2ejTYPsjWXawFgL5g",
    authDomain: "weblyricsdb.firebaseapp.com",
    databaseURL: "https://weblyricsdb.firebaseio.com",
    projectId: "weblyricsdb",
    storageBucket: "weblyricsdb.appspot.com",
    messagingSenderId: "82319742482"
};

firebase.initializeApp(config);

app.service('firebase', function($firebaseObject) {
	const ref = firebase.database().ref().child('Lyrics');

	return ref;
});