$(document).ready(function () {

    const Api = '028497f854d64e3bbec204cc32b6ce3b'

    const ApplicationId = '9a0cb148';
    const api = '7a34298f495a96286835d7025cd4748b';

    // https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free
    // https://api.edamam.com/search?q=chicken&app_id=9a0cb148&app_key=7a34298f495a96286835d7025cd4748b&from=0&to=3&calories=591-722&health=alcohol-free

    console.log("Hello")

    $.ajax({
        type: "GET",
        url: 'https://api.edamam.com/search?q=chicken&app_id=' + ApplicationId + '&app_key=' + api + '&from=10&to=13&calories=591-722&health=alcohol-free',
    }).then(res => {
        let ingredients;
        let recipeList = res.hits;
        console.log(recipeList)

        let recipesDisplay = () => {
            for (r = 0; r < recipeList.length; r++) {
                let IngredDisplay = function () {
                    // ingredients = []
                    for (let i = 0; i < res.hits[r].recipe.ingredientLines.length; i++) {
                        $('.Ingred').append(
                            `<ol class="ingradientNumberBtn" id="ingradientNumber${i}" onClick="reply_click(this.id)"><button class="ingradientNumberBtn" id="ingradientNumberBtn${[i]}"> + </button>     ${res.hits[r].recipe.ingredientLines[i]}</ol>`)
                    }
                }
                $('#apiResulteholder').append(`
                    <div id="eachApiRecipe">
                        <div class="RecipeTitle">
                            <h2>
                                ${res.hits[r].recipe.label}
                            </h2>
                        </div>
                        <div class="imagePlace">
                            <img src="${res.hits[r].recipe.image}" alt="" style="display: block; height: 500px; width: 80%;">
                            <button id="addFavoritebtn">Like it</button>
                        <div class="Ingred">
                        </div >
                        <div id="link" onclick="window.location.href ='${res.hits[r].recipe.url}'">More Info</div>
                    </div>`
                );
                IngredDisplay();
            }
        }
        recipesDisplay();
    })
});

// $(document).on('click', () => {
//     console.log(document.querySelector("id"))
// })

let favoriteList = [];
let values = [];

function reply_click(clicked_id) {
    // click = clicked_id
    favoriteList.push(clicked_id)
    console.log(favoriteList);
    values.push(document.getElementById(clicked_id).innerText);
    // $('.favoriteContainer').append(`<h3>${values}</h3>`);
}


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




// const data = { lat, lon, weather, air };
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
// };
// const db_response = await fetch('/api', options);
// const db_json = await db_response.json();
// console.log(db_json);