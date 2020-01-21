let userIdFire = ''

$(document).ready(function () {
    let userstatusUpdate;
    let data = '';
    $.ajax({
        method: 'GET',
        date: data,
        url: '/status'
    }).then(res => {
        if (res) {
            console.log(res)
            userIdFire = res.uid
            userstatusUpdate = true;
            $('#signUpModal').modal('hide');
            $("#signInBtn").text("Logout");
            $('#signInBtn').attr('data-target', '');
            $('#signInBtn').attr('id', 'logout');
            $('#signUpBtn').hide();
            newSpaceForIngrd()
        } else {
            console.log("Sorrrrrrryyyyyyyyyyyyyy")
            userstatusUpdate = false;
        }
    });


});

const email = '';
const password = '';

// Sign up new users
$(document).on('click', '#signUpNewBtn', (event) => {
    event.preventDefault();
    const email = $('#validationEmail').val()
    const password = $('#validationPassword').val()
    const username = $('#validationUsername').val();
    const diet = $('#validationDiet').val();
    var zipcode = $('#validationZipcode').val();

    // const signupForm = document.querySelector('#signup-form')
    const data = { email, password, username, diet, zipcode };

    console.log(data)

    $.ajax({
        type: "POST",
        url: "/SignUp",
        data: data
    }).then(res => {
        console.log(res);
        res.json(user)

    });
    var zipcode = userIdFire;
    const data2 = { email, password, username, diet, zipcode }
    console.log(userIdFire)
    $.ajax({
        method: 'POST',
        url: "/api/user",
        data: data2,
    }).then(result => {
        console.log(result)
        $('#signUpModal').modal('hide');
        $("#signInBtn").text("Logout");
        $('#signInBtn').attr('data-target', '');
        $('#signInBtn').attr('id', 'logout');
        $('#signUpBtn').hide();
    })



})


// sign in function goes here 
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

    });

    if (e) {
        $('#signModal').modal('hide');
        $("#signInBtn").text("Logout");
        $('#signInBtn').attr('data-target', '');
        $('#signInBtn').attr('id', 'logout');
        $('#signUpBtn').hide();
    } else {
        console.log('signed out');
    }
});

// logout function goes here
$(document).on('click', '#logout', function () {
    var data;
    $.ajax({
        type: "POST",
        url: "/signout",
        data: data
    }).then(res => {
    });
    $('#signModal').modal('hide')
    $("#logout").text("Sign In")
    $('#logout').attr('data-target', '#signModal')
    $('#logout').attr('id', 'signInBtn');
    $('#signUpBtn').show()
});

// Add new space to enter more ingredients
let newSpaceForIngrd = () => {
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
    })
}


// Create Recipe 
const recipedata = {
    title =
    majorIngr =
    ingredients = {
        ingredient1= ,
        ingredient2 =,
        ingredient3 =  
    };
    preparation =
    userId =
    // recipeimage =
}
$.ajax({
    method: 'POST',
    url: "/api/recipe",
    data: recipedata,
}).then(result => {
    console.log(result)
})

// post all recipes

$.ajax({
    method: 'GET',
    url: '',
}).then(res => {


});


// Add Comments 
const date =;
const body =;
const Userid =;
const recipeId = ;

const commentData = {
    date:,
    body:,
    Userid:,
    recipeId:
}

$.ajax({
    method: 'POST',
    url: '/api/comment',
    data: commentData
}).then(res => {

})

// Get comments for each recipe 
$.ajax({
    method: 'GET',
    url: '',
}).then(res => {
    res.json()
})

// like a recipe 

const userId = ;
const recipeId = ;

const favoriteData = {
    userId: ,
    recipeId:
}

$.ajax({
    method: 'POST',
    url: '',
    data: favoriteData
}).then(res => {


})

// get liked recipes 

$.ajax({
    method: 'GET',
    url: '',
}).then(res => {

    res.json()

})