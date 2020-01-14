$(document).ready(function () {

    // ------- ************ Recipes Firebase ********* --------------

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyC6LftGH4U7pUjhGWuIaS4jrd9lDErvT4E",
        authDomain: "project2-e02f7.firebaseapp.com",
        databaseURL: "https://project2-e02f7.firebaseio.com",
        projectId: "project2-e02f7",
        storageBucket: "project2-e02f7.appspot.com",
        messagingSenderId: "1006019730458",
        appId: "1:1006019730458:web:fc321e0b803f211dad85a3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();


    // let recipesinput = {
    //     title: tile,
    //     discreption: discreption,
    //     ingredients: {
    //         Qty: qty,
    //         measure: measure,
    //         ingredient: ingredient,
    //         note: note
    //     },
    //     preparation: preparation
    // }

    // let commentinput = {
    //     userId: userId,
    //     recipeId: recipeId,
    //     comment: comment,
    //     attachedFile: attachedFile
    // }

    // let newUser = {
    //     userEmail: userEmail,
    //     userPassword: userPassword,
    //     userName: userName,
    //     userDiet: userDiet,
    //     userZipcode: userZipcode
    // }



    // Sign up new users

    $(document).on('click', '#signUpNewBtn', (event) => {
        event.preventDefault();
        $('#emailAndPasswordSingUp').attr('style', 'display:none');
        $('#otherInfoSingUp').attr('style', 'display:block')
        const email = $('#validationEmail').val()
        const password = $('#validationPassword').val()
        auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    })
    // rethreve user id
    var user = firebase.auth().currentUser;

    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }


    // added new user information:



    // function writeUserData(userId, name, email, imageUrl) {
    //     firebase.database().ref('users/' + userId).set({
    //         username: name,
    //         email: email,
    //         profile_picture: imageUrl
    //     });
    // }

    var database = firebase.database();
    let userId = '3wMpeurJzLUT53gf5evmSIO91oK2'

    function writeUserData(userId, name, diet) {
        firebase.database().ref('users/' + userId).set({
            username: 'hammo',
            diet: 'vegi',
            // profile_picture: imageUrl
        });
    }

    writeUserData();

    // const auth = firebase.auth();

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('signed in');
            $("#signInBtn").text("Logout")
            $('#signInBtn').attr('id', 'logout')
            $('#signUpBtn').hide()
        } else {
            console.log('signed out');
        }
    });

    $(document).on('click', "#signInSubmitBtn", (e) => {
        e.preventDefault();
        email = $("#signInEmail").val();
        password = $("#signInPassword").val();
        auth.signInWithEmailAndPassword(email, password);
        if (e) {
            $('#signModal').modal('hide');
            $("#signInBtn").text("Logout");
            $('#signInBtn').attr('data-target', '');
            $('#signInBtn').attr('id', 'logout');
        } else {
            console.log('signed out');
        }
    });

    $(document).on('click', '#logout', function () {
        auth.signOut();
        $('#signModal').modal('hide')
        $("#logout").text("Sign In")
        $('#logout').attr('data-target', '#signModal')
        $('#logout').attr('id', 'signInBtn');
        $('#signUpBtn').show()
    });


    // 3wMpeurJzLUT53gf5evmSIO91oK2


    document.onkeyup = e => {
        if (e.key === 'Enter') {
        } else if (e.key === 'Escape') {
            auth.signOut();
        }
    };





    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         // User is signed in.
    //         var displayName = user.displayName;
    //         var email = user.email;
    //         var emailVerified = user.emailVerified;
    //         var photoURL = user.photoURL;
    //         var isAnonymous = user.isAnonymous;
    //         var uid = user.uid;
    //         var providerData = user.providerData;
    //         // ...
    //     } else {
    //         // User is signed out.
    //         // ...
    //     }
    // });










});

