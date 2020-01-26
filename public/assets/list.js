$(document).ready(function () {

    const Api = '028497f854d64e3bbec204cc32b6ce3b'

    const ApplicationId = '9a0cb148';
    const api = '7a34298f495a96286835d7025cd4748b';
    const choice = 'salad'
    const firstN = ''
    const Last = firstN + 3

    $.ajax({
        type: "GET",
        url: 'https://api.edamam.com/search?q=' + choice + '&app_id=' + ApplicationId + '&app_key=' + api + '&from=10&to=13&calories=591-722&health=alcohol-free',
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
                    <div class="Ingred" id='Ingred${r}'>
                </div >
                <div id="link" onclick="window.location.href ='${res.hits[r].recipe.url}'">More Info</div>
                </div>`
                );
                let IngredDisplay = function () {
                    for (let i = 0; i < res.hits[r].recipe.ingredientLines.length; i++) {
                        $(`#Ingred${r}`).append(
                            `<ol class="ingradientApiNumberBtn" id="ingradientNumber${i}">
                            <button class="ingradientNumberBtn" data-id="ing${[i]}" id="ingradientNumberBtn${[i]}" value="${res.hits[r].recipe.ingredientLines[i]}"> + </button>     ${res.hits[r].recipe.ingredientLines[i]}</ol>`)
                    }
                }
                IngredDisplay()
            }
        }
        recipesDisplay();
    })
});

// geo locaion

if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);
    });
} else {
    console.log('geolocation not available');
}


