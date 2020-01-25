$(document).ready(function () {
    let data = '';
    $.ajax({
        method: 'GET',
        date: data,
        url: '/status'
    }).then(res => {
        if (res) {
            console.log(res)
            sessionStorage.setItem("signedInUser", res.uid)

            $('#signUpModal').modal('hide');
            $("#signInBtn").text("Logout");
            $('#signInBtn').attr('data-target', '');
            $('#signInBtn').attr('id', 'logout');
            $('#signUpBtn').hide();
            // newSpaceForIngrd()
        } else {
            console.log("Sorrrrrrryyyyyyyyyyyyyy")
            userstatusUpdate = false;
        }
    });
});

// const email = '';
// const password = '';

// Sign up new users
$(document).on('click', '#signUpNewBtn', (event) => {
    event.preventDefault();
    const email = $('#validationEmail').val()
    const password = $('#validationPassword').val()
    const username = $('#validationUsername').val();
    const diet = $('#validationDiet').val();
    const zipcode = $('#validationZipcode').val();

    const data = { email, password, username, diet, zipcode };

    $.ajax({
        type: "POST",
        url: "/SignUp",
        data: data
    }).then(res => {

    });
    $('#signUpModal').modal('hide');
    $("#signInBtn").text("Logout");
    $('#signInBtn').attr('data-target', '');
    $('#signInBtn').attr('id', 'logout');
    $('#signUpBtn').hide();
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
        $('.newIngrediantSpan').append(` <div class="form-row newIngredients" id ="igre${score++}"><i id="icon${icon++}">*</i>    
<input type="text" class="form-control col-md-6 formInputNote" id="formInputNote" placeholder="Enter the ingredient ">
</div>`)
    })
}

newSpaceForIngrd();

// Add new recipe function

$(document).on('click', '#addNewRecipeBtn', (ev) => {
    ev.preventDefault();
    console.log('Hello')
    const recipeTitle = $('#recipeTitleInput').val()
    const recipeDiscreption = $('#recipeDiscreptionInput').val()
    const recipeIngredients = [];
    $(".newIngredients").each(function () {
        const ingredient = $(this).find('.formInputNote').val()
        recipeIngredients.push(ingredient);
    })

    const allrecipeIngredients = recipeIngredients.join('&').toString()

    const recipePreparation = $('#recipePreparation').val()
    const recipePhoto = $('#recipePhoto').val()

    let data = {
        title: recipeTitle,
        majorIngr: recipeDiscreption,
        ingredients: allrecipeIngredients,
        preparation: recipePreparation,
        UserId: sessionStorage.getItem("signedInUser")
    }

    $.ajax({
        method: 'POST',
        url: "/api/recipe",
        data: data,
    }).then(result => {
        console.log(result)
    })
})

// // post all recipes

$.ajax({
    method: 'GET',
    url: '',
}).then(res => {


});
// const recipeId = 0;

// add comment function
$(document).on('click', '#addNewCommentBtn', (comm) => {
    comm.preventDefault();
    // let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    const commentData = {
        body: $('#commentEntryInpuId').val(),
        UserId: sessionStorage.getItem("signedInUser"),
        recipeId: '1'
    }
    // // ********************************
    $.ajax({
        method: 'POST',
        url: '/api/comment',
        data: commentData
    }).then(res => {
        res.send()
    })
})
// // Get comments for each recipe

// $.ajax({
//     method: 'GET',
//     url: '',
// }).then(res => {
//     res.json()
// })

// // like a recipe 
// // ***********************
// // const userId = ;
// // const recipeId = ;

// // const favoriteData = {
// //     userId: ,
// //     recipeId:
// // }
// // **************************
// $.ajax({
//     method: 'POST',
//     url: '',
//     data: favoriteData
// }).then(res => {


// })

// // get liked recipes 

// $.ajax({
//     method: 'GET',
//     url: '',
// }).then(res => {

//     res.json()

// })

// Add item to shopping list database

let favoriteList = [];

$(document).on('click', ('.ingradientApiNumberBtn'), (ev) => {
    ev.preventDefault();
    const apiIngToList = $(ev.target).val();
    console.log(apiIngToList)
    favoriteList.push(apiIngToList)
    console.log(favoriteList);
    const UserId = sessionStorage.getItem("signedInUser");
    const item = $(ev.target).val();
    const data = { UserId: UserId, item: item }
    $.ajax({
        method: 'POST',
        url: '/api/shopping',
        data: data
    }).then(res => {
        res.send()
    })
})