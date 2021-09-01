(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyADSPWytw4D0V_x_De1WDIAG3uyFxJBv6I",
        authDomain: "flash-char-f1800.firebaseapp.com",
        databaseURL: "https://flash-char-f1800.firebaseio.com",
        projectId: "flash-char-f1800",
        storageBucket: "flash-char-f1800.appspot.com",
        messagingSenderId: "914733868830",
        appId: "1:914733868830:web:3b349a6df4947b46650b0f"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);


      const preobject = document.getElementById("Moisture");
      const prehumidity = document.getElementById("Humidity");
      const pretemp = document.getElementById("Temprature");
      const prewlevel = document.getElementById("Waterlevel");

      const dbRefObject = firebase.database().ref().child('Moisture');
      const dbRefhumidity = firebase.database().ref().child('Humidity');
      const dbRefpretemp = firebase.database().ref().child('Temprature');
      const dbRefprewlevel = firebase.database().ref().child('Waterlevel');


      dbRefObject.on('value', snap => {
          preobject.innerHTML = snap.val();
          console.log(snap.val());
      });
      dbRefhumidity.on('value', snap => {
        prehumidity.innerHTML = snap.val();
        console.log(snap.val());
    });

    dbRefpretemp.on('value', snap => {
        pretemp.innerHTML = snap.val();
        console.log(snap.val());
    });

    dbRefprewlevel.on('value', snap => {
        prewlevel.innerHTML = snap.val();
        console.log(snap.val());
    });


}());