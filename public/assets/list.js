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
                    <div class="RecipeTitle">
                        <p>
                            ${res.hits[r].recipe.label}
                        </p>
                    </div>
                    <div class="imagePlace">
                        <img src="${res.hits[r].recipe.image}" alt="" style="flex:1">
                        </div>
                        <button id="addFavoritebtn">Like it</button>
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

// let favoriteList = [];
// let values = [];

// $(document).on('click', ('.ingradientApiNumberBtn'), (ev) => {
//     ev.preventDefault();
//     const apiIngToList = $(ev.target).val();
//     console.log(apiIngToList)
//     favoriteList.push(apiIngToList)
//     console.log(favoriteList);
//     const UserId = ;
//     const item = $(ev.target).val();
//     const data = { UserId, item }
//     $.ajax({
//         method: 'POST',
//         url: '/api/shopping',
//         data
//     }).then(res => {
//         res.send(res)
//     })
// })




// onClick="reply_click(this.id)"

console.log(favoriteList);


// function reply_click(clicked_id) {
//     // click = clicked_id
//     favoriteList.push(clicked_id)
//     console.log(favoriteList);
//     // values.push(document.getElementById(clicked_id).innerText);
//     // $('.favoriteContainer').append(`<h3>${values}</h3>`);
// }


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


