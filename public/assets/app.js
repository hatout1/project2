$(document).ready(function () {


    // ------- ************ Recipes Firebase ********* --------------
    // Your web app's Firebase configuration
    // var firebaseConfig = {
    //     apiKey: "AIzaSyC6LftGH4U7pUjhGWuIaS4jrd9lDErvT4E",
    //     authDomain: "project2-e02f7.firebaseapp.com",
    //     databaseURL: "https://project2-e02f7.firebaseio.com",
    //     projectId: "project2-e02f7",
    //     storageBucket: "project2-e02f7.appspot.com",
    //     messagingSenderId: "1006019730458",
    //     appId: "1:1006019730458:web:fc321e0b803f211dad85a3"
    // };
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
    // const auth = firebase.auth();
    const email = '';
    const password = '';

    let Ajax = $.ajax({
        type: "POST",
        url: "/login"
    }).then(res => {
        console.log(res)
        email = $('#validationEmail').val();
        password = $('#validationPassword').val();
        return password;
        return email;
    });
    console.log(Ajax)

    // Sign up new users
    $(document).on('click', '#signUpNewBtn', (event) => {
        event.preventDefault();
        const email = $('#validationEmail').val()
        const password = $('#validationPassword').val()
        auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            statusLog()
        });

    })




    // added new user information:



    var database = firebase.database();
    let userId = '3wMpeurJzLUT53gf5evmSIO91oK2'

    // function writeUserData(userId, name, diet) {
    //     firebase.database().ref('users/' + userId).set({
    //         username: 'hammo',
    //         diet: 'vegi',
    //         // profile_picture: imageUrl
    //     });
    // }

    // writeUserData();

    let statusLog = auth.onAuthStateChanged(user => {
        if (user) {
            console.log('signed in');
            console.log(user.email)
            console.log(user.uid)
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


// Add new space to enter more ingredients

let score = 2
let icon = 2

$('.addNewIngrdientPlace').on('click', (event) => {
    event.preventDefault()
    $('.newIngrediantSpan').append(` <div class="form-row" id ="igre${score++}"><i id="icon${icon++}">*</i>
<input type="text" class="form-control col-md-1" id="exampleInputPassword1" placeholder="Qty">
<input type="text" class="form-control col-md-2" id="exampleInputPassword1" placeholder="Measure">
<input type="text" class="form-control col-md-3" id="exampleInputPassword1"
    placeholder="Ingredient">
<input type="text" class="form-control col-md-6" id="exampleInputPassword1" placeholder="Note">
</div>`)
});
