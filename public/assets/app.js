let userStatus = '';

$(document).ready(function () {

    $.ajax({
        method: 'GET',
        url: '/status'
    }).then(res => {
        if (res) {
            console.log(res)
            sessionStorage.setItem("signedInUser", res.uid)
            userStatus = sessionStorage.setItem("signedInUser", res.uid)
            // $('#signUpModal').modal('hide');
            // $("#signInBtn").text("Logout");
            // $('#signInBtn').attr('data-target', '');
            // $('#signInBtn').attr('id', 'logout');
            // $('#signUpBtn').hide();
            newSpaceForIngrd()
        } else {
            console.log("Sorrrrrrryyyyyyyyyyyyyy")
            userstatusUpdate = false;
        }
    });
    allRecipes()
    // console.log(userStatus)
    if (userStatus === "") {
        // sessionStorage.setItem("signedInUser", res.uid)
        // sessionStorage.clear()
        console.log("nothing to show")
    } else {
        $('#signUpModal').modal('hide');
        $("#signInBtn").text("Logout");
        $('#signInBtn').attr('data-target', '');
        $('#signInBtn').attr('id', 'logout');
        $('#signUpBtn').hide();
    }
});


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
    // console.log('Hello')
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
let favoiteTitle = '';
// // post all recipes
let allRecipes = () => {

    $.ajax({
        method: 'GET',
        url: '/api/recipe',
    }).then(res => {
        // console.log(res)
        // console.log(res[0].title)
        // console.log(res[0].ingredients)
        // console.log(res[0].createdAt.split('T')[0])
        let newRecipe = '<div></div>';
        res.map((recipe, i) => {
            console.log(recipe)
            // console.log(i);
            console.log(recipe.recipeId)
            let recipeIngredients = recipe.ingredients.split('&');
            // console.log(recipeIngredients);
            newRecipe = newRecipe + `<div class="card mt-2">
                     <div class="card-body pt-4">
                         <div class="text-center">
                         <h2 class="card-text">
                         ${recipe.title}
                         </h2>
                     </div>
                     <br>
                     <div class="text-center">
                         <h4>Ingredients: </h4>
                         <p class="card-text IngredDis" id="recipe${i}">`;

            for (let r = 0; r < recipeIngredients.length; r++) {
                console.log(recipeIngredients[r]);
                newRecipe = newRecipe + `<ol class="ingradientApiNumberBtn" id="ingradientNumber${i}">
                             <button class="ingradientNumberBtn" data-id="ing${[i]}" id="ingradientNumberBtn${[i]}" value="${recipeIngredients[r]}"> + </button> ${recipeIngredients[r]}</ol>`;
            }
            newRecipe = newRecipe + `</p>
                     </div>
                     <br>
                     <div class="text-center">
                     <h4>Preparation</h4>
                         <p class="card-text">
                             ${recipe.preparation}
                         </p>
                     </div>
                     <div class="text-right pt-4">
                         <button id="favoriteRecipeBtn" data-Ingred="${recipeIngredients}" data-id="${recipe.recipeId}" data-preparation="${recipe.preparation}" data-title="${recipe.title}" class="btn btn-outline-danger">Add to favorite</button>
                     </div>
                 </div>
             </div>`;
        });
        $('.allRecipesAres').append(newRecipe);
    })
}

// add comment function
$(document).on('click', '#addNewCommentBtn', (comm) => {
    comm.preventDefault();
    // let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    const commentData = {
        body: $('#commentEntryInpuId').val(),
        UserId: sessionStorage.getItem("signedInUser"),
        recipeId: '1'
    }
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

// Display shopping item on GroceryList page
let groceryListItem = () => {
    const UserId = sessionStorage.getItem("signedInUser");
    $.ajax({
        method: "GET",
        url: `/api/shopping/?UserId=${UserId}`
    }).then(res => {
        $(".items-container").empty();
        res.map(items => {
            $(".items-container").append(
                `<div class="card mt-2">
                <div class="card-body pt-4">
                  <div class="text-center">
                    <p class="card-text">
                      ${items.item}
                    </p>
                  </div>
                  <div class="text-right pt-4">
                    <button id="deleteBtn" data-id="${items.id}" class="btn btn-outline-danger">Delete</button>
                  </div>
                </div>
              </div>`
            );
        });
    });
}

groceryListItem();

// Favorite users recipes entries
$(document).on('click', "#favoriteRecipeBtn", (event) => {
    event.preventDefault();
    const liked = {
        UserId: sessionStorage.getItem("signedInUser"),
        title: event.target.getAttribute('data-title'),
        preparation: event.target.getAttribute('data-preparation'),
        recipeId: event.target.getAttribute('data-Id')
    }
    console.log(liked)
    $.ajax({
        method: 'POST',
        url: '/api/favorite',
        data: liked
    }).then(res => {
        res.send()
    })

})

// Favorite api recipes
let favoriteRecipes = []
$(document).on('click', ('#addFavoriteBtn'), (ev) => {
    ev.preventDefault();
    console.log('Hello')

    const liked = {
        UserId: sessionStorage.getItem("signedInUser"),
        title: event.target.getAttribute('data-title'),
        preparation: event.target.getAttribute('data-info'),
        recipeId: event.target.getAttribute('data-Id')
    }
    console.log(liked)
    $.ajax({
        method: 'POST',
        url: '/api/favorite',
        data: liked
    }).then(res => {
        res.send()
    })
})

// get liked recipes 
let getAllFavorites = () => {
    const UserId = sessionStorage.getItem("signedInUser");
    $.ajax({
        method: 'GET',
        url: `/api/favorite/?UserId=${UserId}`,
    }).then(res => {
        res.map(fav => {
            console.log(fav)
            $('.favoriteContainer').append(`<div id="titleOfFavorite"><h2>${fav.title}</h2></div>
           <div id="preparationOfFav">
    <p>${fav.preparation}</p>
            </div>`)
        })
        console.log(res)
    })

}

getAllFavorites();