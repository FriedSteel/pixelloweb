// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBVMul8WJqFm4yNjGLMqu1otWJKwFZbHFI",
    authDomain: "nightowl-d770b.firebaseapp.com",
    databaseURL: "https://nightowl-d770b.firebaseio.com",
    projectId: "nightowl-d770b",
    storageBucket: "nightowl-d770b.appspot.com",
    messagingSenderId: "559687011681",
    appId: "1:559687011681:web:c2af215c8a162d0a410920"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var moviesRef = firebase.database().ref('movies');
  var moviesRefStore = firebase.firestore();

  moviesRefStore.collection('movies').orderBy("uid", "desc").limit(1).get().then(function(querySnapshot) {

    const uid_div = document.querySelector("#uid_div");
    querySnapshot.forEach(function(doc) {
		
		var pUid = doc.data().uid
		var Uid = pUid + 1

        uid_div.innerHTML += "<p>UID: <b>" + Uid + "</b></p>";
        
    });
  });

  const rdb_div = document.querySelector("#rdb_div");
  moviesRef.limitToFirst(1).on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.key;
        var finalData = parseInt(childData.substring(0, 4)) - 1
        rdb_div.innerHTML += "<p>RDB No: <b>" + finalData + "</b></p>";
      });
          
  });
  

document.getElementById('addMoviesForm').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    var rdbName = getInputVal('rdbName');
    var fsName = getInputVal('fsName');
    var uidString = getInputVal('uid');
    var uid = parseInt(uidString, 10);
    var title = getInputVal('title');
    var yearString = getInputVal('year');
    var year = parseInt(yearString, 10);
    var size = getInputVal('size');
    var size480 = getInputVal('size480');
    var quality = getInputVal('quality');
    var quality480 = getInputVal('quality480');
    var audio = getInputVal('audio');
    var audio480 = getInputVal('audio480');
    var url = getInputVal('url');
    var url480 = getInputVal('url480');
    var image = getInputVal('image');
    var youtube = getInputVal('youtube');

    saveMovies(rdbName, fsName, uid, title, image, year, url, url480,
        size, size480, quality, quality480, audio, audio480, youtube);

        document.querySelector('.alert').style.display = 'block';
        setTimeout(function(){
            document.querySelector('.alert').style.display = 'none';
        },1800);
    
        window.setTimeout(function(){
            window.location.reload();
        }, 2800);
}

function getInputVal(id){
    return document.getElementById(id).value;
}

function saveMovies(rdbName, fsName, uid, title, image, year, url, url480,
    size, size480, quality, quality480, audio, audio480, youtube){
        
        var newMoviesRef = moviesRef.child(rdbName);
        if (url480) {
        newMoviesRef.set({
            title: title,
            image: image,
            year: year,
            url: url,
            url480: url480,
            size: size,
            size480: size480,
            quality: quality,
            quality480:quality480,
            audio: audio,
            audio480: audio480,
            youtube: youtube
        });
    } else {
        newMoviesRef.set({
            title: title,
            image: image,
            year: year,
            url: url,
            size: size,
            quality: quality,
            audio: audio,
            youtube: youtube
        });
    }

    if (url480) {

        moviesRefStore.collection("movies").doc(fsName).set({
  
            uid: uid,
            title: title,
            image: image,
            year: year,
            url: url,
            url480: url480,
            size: size,
            size480: size480,
            quality: quality,
            quality480: quality480,
            audio: audio,
            audio480: audio480,
            youtube: youtube
      });
    } else {
        moviesRefStore.collection("movies").doc(fsName).set({
  
            uid: uid,
            title: title,
            image: image,
            year: year,
            url: url,
            size: size,
            quality: quality,
            audio: audio,
            youtube: youtube
      });
    }
    }