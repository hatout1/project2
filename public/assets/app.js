$(document).ready(function () {
    // const signedInUserId = 'GvP714nmvhhtxzwPnum2kovRpqN2';
    let signedInUserId = '3PuvEQOyB9RSDNbZfbLjRLWscgf2';
    // const signedInUserId = 'v3KNN9H2iHMqSoYpD0B8KOrRMl52';


    let userStatus = '3PuvEQOyB9RSDNbZfbLjRLWscgf2';


    const Api = '028497f854d64e3bbec204cc32b6ce3b'

    const ApplicationId = '9a0cb148';
    const api = '7a34298f495a96286835d7025cd4748b';
    const choice = 'salad'
    const firstN = ''
    const Last = firstN + 3

    $.ajax({
        type: "GET",
        url: 'https://api.edamam.com/search?q=' + choice + '&app_id=' + ApplicationId + '&app_key=' + api + '&from=10&to=15&calories=591-722&health=alcohol-free',
    }).then(res => {
        let ingredients;
        let recipeList = res.hits;
        console.log(recipeList)
        let recipesDisplay = () => {
            for (r = 0; r < recipeList.length; r++) {
                $('#apiResulteholder').append(`
                <div cLass="eachApiRecipe" id="recipeData${r}"style="flex:1;">
                    <div class="RecipeTitle addFavoriteToLike" id="addFavoritetitle">
                        <p>
                            ${res.hits[r].recipe.label}
                        </p>
                    </div>
                    <div class="imagePlace addFavoriteToLike" id="addFavoriteimage">
                        <img src="${res.hits[r].recipe.image}" alt="" style="flex:1">
                    </div>
                        <button class="addFavoriteBtnClass addFavoriteToLike" id="addFavoriteBtn" data-title ="${res.hits[r].recipe.label}" data-image="${res.hits[r].recipe.image}" data-info="${res.hits[r].recipe.url}" style="margin-bottom:10px;">Like it</button>
                    <div class="apiIngredientslistDisplay">
                    <p>Click for ingredients</p>
                    </div>
                    <div class="panel" style="display:none;">
                        <div class="Ingred" id='Ingred${r}'>
                        </div >
                        <div id="linkToMoreInfo" onclick="window.open('${res.hits[r].recipe.url}')">More Info
                        </div>
                    
                    </div>
                </div>`
                );
                let IngredDisplay = function () {
                    for (let i = 0; i < res.hits[r].recipe.ingredientLines.length; i++) {
                        $(`#Ingred${r}`).append(
                            `
                            <ol class="ingradientApiNumberBtn" id="ingradientNumber${i}">
                            <button class="ingradientNumberBtn" data-id="ing${[i]}" id="ingradientNumberBtn${[i]}" value="${res.hits[r].recipe.ingredientLines[i]}"> + </button>     ${res.hits[r].recipe.ingredientLines[i]}</ol>`)
                    }
                }
                IngredDisplay()
            }
        }
        recipesDisplay();
    })

    $.ajax({
        method: 'GET',
        url: '/status'
    }).then(res => {
        if (res) {
            console.log(res);
            // (signedInUserId).push(res.uid);
            function setCookie(name, value, days) {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "") + expires + "; path=/";
            }
            function getCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }
            function eraseCookie(name) {
                document.cookie = name + '=; Max-Age=-99999999;';
            }

            setCookie('userIdCookie', res.uid, 1);

            userStatus = getCookie('userIdCookie');



            sessionStorage.setItem("signedInUser", res.uid)
            // userStatus = "1RumrAiDWqWMNHIueOmE3hnaMyJ2"
            // sessionStorage.getItem("signedInUser");
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







    // console.log(userStatus)
    if (userStatus === "") {
        // sessionStorage.clear()
        console.log("nothing to show")
    } else {
        sessionStorage.setItem("signedInUser", signedInUserId)
        $('#signUpModal').modal('hide');
        $("#signInBtn").text("Logout");
        $('#signInBtn').attr('data-target', '');
        $('#signInBtn').attr('id', 'logout');
        $('#signUpBtn').hide();

    }


    // get liked recipes ***************************************************************
    let getAllFavorites = () => {
        const UserId = getCookie('userIdCookie')
        // sessionStorage.getItem("signedInUser");
        $.ajax({
            method: 'GET',
            url: `/api/favorite/?UserId=${UserId}`,
        }).then(res => {
            res.map(fav => {
                console.log(fav)
                $('.favoriteContainer').append(`<div class="titleOfFavorite"> <div id="titleOfFavorite"><h2>${fav.title}</h2></div>
           <div id="preparationOfFav">
    <p>${fav.preparation}</p>
            </div></div>`)
            })
            console.log(res)
        })

    }

    getAllFavorites();
    //*******************************************************************
    // });


    $(document).on('click', '.apiIngredientslistDisplay', () => {
        $(".panel").slideToggle("slow");
    })



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
            res.send();
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

            UserId: getCookie('userIdCookie'),
            // sessionStorage.getItem("signedInUser")
        }

        $.ajax({
            method: 'POST',
            url: "/api/recipe",
            data: data,
        }).then(result => {
            console.log(result)
        })
        allRecipes()
    })
    let favoiteTitle = '';
    // // post all recipes
    let allRecipes = () => {

        $.ajax({
            method: 'GET',
            url: '/api/recipe',
        }).then(res => {
            // console.log(res)
            // console.log("these are all recipes' titles: \n" + res)
            // console.log(res[0].ingredients)
            // console.log(res[0].createdAt.split('T')[0])
            let newRecipe = '<div></div>';
            res.map((recipe, i) => {
                console.log("these are all recipes' titles: \n" + recipe)
                // console.log(i);
                console.log(recipe.recipeId)
                let recipeIngredients = recipe.ingredients.split('&');
                // console.log(recipeIngredients);
                newRecipe = newRecipe + `
                <div class="recipeDiv">
                     <div class="recipeCountainer">
                         <div class="userRecipeTitle">
                            <h2 class="card-text">
                                ${recipe.title}
                            </h2>
                        </div>
                        <br>
                        <div class="userRecipeIngredients">
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
                    <div class="userRecipePreparation">
                        <h4>Preparation</h4>
                         <p id="userRecipePreparation">
                             ${recipe.preparation}
                         </p>
                        </div>
                    </div>
                        <div class="text-right pt-2 mb-5">
                        <button id="addNewCommentBtn" data-Ingred="addNewCommentBtn" data-toggle="modal" data-target="#AddCommentModal"
                        data-whatever="@mdo" data-id="${recipe.recipeId}" data-preparation="${recipe.preparation}" data-title="${recipe.title}" class="btn btn-secondary btn-lg btn-radius">Add Comment</button>
                         <button id="favoriteRecipeBtn" data-Ingred="${recipeIngredients}" data-id="${recipe.recipeId}" data-preparation="${recipe.preparation}" data-title="${recipe.title}" class="btn btn-success btn-lg btn-radius"">Add to favorite</button>
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
            UserId: getCookie('userIdCookie'),
            // sessionStorage.getItem("signedInUser"),
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
        const UserId = getCookie('userIdCookie')
        // sessionStorage.getItem("signedInUser");
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
        const UserId = getCookie('userIdCookie');
        // sessionStorage.getItem("signedInUser");
        $.ajax({
            method: "GET",
            url: `/api/shopping/?UserId=${UserId}`
        }).then(res => {
            $(".items-container").empty();
            res.map(items => {
                $(".items-container").append(
                    `<div class="card mt-2">
                <div class="card-body cardBodyItem">
                  <div class="itemToBuy">
                    <p class="card-text">
                      ${items.item}
                    </p>
                  </div>
                  <div class="btnToDeleteItem">
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
            UserId: getCookie('userIdCookie'),
            // sessionStorage.getItem("signedInUser"),
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
            UserId: getCookie('userIdCookie'),
            // signedInUserId,
            // sessionStorage.getItem("signedInUser"),
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
    allRecipes()
});