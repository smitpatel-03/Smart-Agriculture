(function() {

	// Initialize Firebase
	var firebaseConfig = {
		apiKey: "AIzaSyAAsjGox9ByWZBGRX9gw5_3LLv90kig8LA",
		authDomain: "pro123-7880a.firebaseapp.com",
		projectId: "pro123-7880a",
		storageBucket: "pro123-7880a.appspot.com",
		messagingSenderId: "745575540817",
		appId: "1:745575540817:web:a8624b4459196e6275b070",
		measurementId: "G-NMWS9MPJ3Y"
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);

  // Get the DOM elements from index page.
  var txtEmail = document.getElementById("txtEmail");
  var txtPassword = document.getElementById("txtPassword");
	var btnLogin = document.getElementById("btnLogin");
  var btnSignup = document.getElementById("btnSignup");
  var btnLogout = document.getElementById("btnLogout");

  // Add login event, with callback function e.
  btnLogin.addEventListener("click", e => {
  	// Get email and password values.
  	var email = txtEmail.value;
  	var password = txtPassword.value;
  	// Store Firebase authentication namespace.
  	var auth = firebase.auth();
  	// Sign in user using Firebase Authentication methods.
  	var promise = auth.signInWithEmailAndPassword(email, password);
  	// Use the promise to resolve the user,
  	// or catch any errors that occur and log them to console.
  	promise.catch(e => console.log(e.message));
  	// Clear the email and password input fields.
  	txtEmail.value = "";
  	txtPassword.value = "";
  })

  // Add signup event, with callback function e.
  btnSignup.addEventListener("click", e => {
  	// Get email and password values.
  	var email = txtEmail.value;
  	var password = txtPassword.value;
  	// Store Firebase authentication namespace.
  	var auth = firebase.auth();
  	// Sign in user using Firebase Authentication methods.
  	var promise = auth.createUserWithEmailAndPassword(email, password);
  	// Use the promise to resolve the user,
  	// or catch any errors that occur and log them to console.
  	promise.catch(e => console.log(e.message));
  	// Clear the email and password input fields.
  	txtEmail.value = "";
  	txtPassword.value = "";
  });

  // Add logout event, with callback function e.
  btnLogout.addEventListener("click", e => {
  	firebase.auth().signOut();
  	console.log("Logged out.");
  })

  // Add a real-time authentication listener.
  firebase.auth().onAuthStateChanged(firebaseUser => {
  	// Checks if user exists (is logged in).
  	// Show the "Log out" button if logged in.
  	if (firebaseUser)
  	{
  		console.log("Logged in as: " + firebaseUser["email"]);
  		console.log(firebaseUser);
  		btnLogout.classList.remove("hide");
          window.location = "dashboard.html";
  	}
  	// Hide the "Log out" button if not logged in.
  	else
  	{
  		console.log("Not logged in.")
  		btnLogout.classList.add("hide");
  	}
  });

}());