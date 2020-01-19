$(document).ready(function () {

    const email = '';
    const password = '';

    // Sign up new users
    $(document).on('click', '#signUpNewBtn', (event) => {
        event.preventDefault();
        const email = $('#validationEmail').val()
        const password = $('#validationPassword').val()
        const data = { email, password };
        $.ajax({
            type: "POST",
            url: "/SignUp",
            data: data
        }).then(res => {
            console.log(res);
        });
    })




    // ********************************************************
    // writeUserData();
    // ********************************************************

    // added new user information:

    // function writeUserData(userId, name, diet) {
    //     firebase.database().ref('users/' + userId).set({
    //         username: 'hammo',
    //         diet: 'vegi',
    //         // profile_picture: imageUrl
    //     });
    // }

    $(document).on('click', "#signInSubmitBtn", (e) => {
        e.preventDefault();
        const email = $("#signInEmail").val();
        const password = $("#signInPassword").val();
        const data = { email, password };
        $.ajax({
            type: "POST",
            url: "/home",
            data: data
        }).then(res => {
            // console.log(res);
        });
        if (e) {
            $('#signModal').modal('hide');
            $("#signInBtn").text("Logout");
            $('#signInBtn').attr('data-target', '');
            $('#signInBtn').attr('id', 'logout');
            $('#signUpBtn').hide()
        } else {
            console.log('signed out');
        }
    });

    $(document).on('click', '#logout', function () {
        var data;
        $.ajax({
            type: "POST",
            url: "/signout",
            data: data
        }).then(res => {
            // console.log(res);
        });
        $('#signModal').modal('hide')
        $("#logout").text("Sign In")
        $('#logout').attr('data-target', '#signModal')
        $('#logout').attr('id', 'signInBtn');
        $('#signUpBtn').show()
    });

    let data = '';
    $.ajax({
        method: 'GET',
        date: data,
        url: '/status'
    }).then(res => {
        if (res) {
            console.log(res)
        } else {
            console.log("Sorrrrrrryyyyyyyyyyyyyy")
        }
    });

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
