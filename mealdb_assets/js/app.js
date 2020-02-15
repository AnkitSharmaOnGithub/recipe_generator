var mealData;
//DOM Elements
// var DOMELements = {
//     meal_name : 'meal_name',
//     meal_recipe_image : 'meal_recipe--image',
//     meal_details : 'meal_details',
//     meal_recipe_text : 'meal_recipe--text',
//     meal_ingredients : 'meal_ingredients',
//     meal_video : 'meal_video',    
// }

// function generateDOMElements(DOMels){

// }

var meal_name = document.querySelector('.meal_name');
var meal_recipe_image = document.querySelector('.meal_recipe--image');
var meal_details = document.querySelector('.meal_details');
var meal_recipe_text = document.querySelector('.meal_recipe--text');
var meal_ingredients = document.querySelector('.meal_ingredients');
var meal_video = document.querySelector('.meal_video');

var normal__category = document.querySelector('.normal--category');
var normal__area = document.querySelector('.normal--area');
var normal__tags = document.querySelector('.normal--tags');
var normal__drinks = document.querySelector('.normal--drinks');
var ingredient__list = document.querySelector('.ingredient-list');
var loader = document.querySelector('.lds-hourglass');

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#get_meal').addEventListener('click', function () {
        // console.log('Clicked');
        loader.style.opacity = 1;
        loader.style.zIndex = 2;
        document.querySelector('#display_meal').style.display = 'none';
        setTimeout(
            () => {
                resetDOM();
                fetchMeal();
                loader.style.display = 'none';
            }, 2000
        )
    })
});

function resetDOM() {
    meal_name.innerHTML = null;
    meal_recipe_image.innerHTML = null;
    meal_recipe_text.innerHTML = null;
    meal_name.innerHTML = null;
    ingredient__list.innerHTML = null;

    normal__category.innerHTML = null;
    normal__area.innerHTML = null;
    normal__tags.innerHTML = null;
    normal__drinks.innerHTML = null;
}

function fetchMeal() {
    var promise = fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    promise
        .then(response => response.json())
        .then(data => {
            mealData = data.meals[0];
            // console.log(mealData);
            if (mealData.idMeal !== undefined) {
                displayMeal();
                fetching = false;
            }
        })
        .catch(error => {
            alert('Our Servers are down. Right Now!.');
        })
}

function displayMeal() {
    loader.style.zIndex = -2;
    loader.style.opacity = 0;

    document.querySelector('#display_meal').style.display = 'block';

    //Add the name
    meal_name.textContent = mealData.strMeal;

    //Add the image
    const image = document.createElement('img');
    image.setAttribute('src', mealData.strMealThumb);
    image.setAttribute('alt', mealData.strMeal);
    meal_recipe_image.appendChild(image);

    //Add recipe
    var para = document.createElement('p');
    var textNode = document.createTextNode(mealData.strInstructions);
    para.appendChild(textNode);
    meal_recipe_text.appendChild(para);

    //Add Details
    normal__category.textContent = mealData.strCategory;
    normal__area.textContent = mealData.strArea;
    normal__tags.textContent = mealData.strTags;
    normal__drinks.textContent = mealData.strDrinkAlternate;

    //Add ingredients to list
    for (var i = 1; i <= 20; i++) {
        let IngredientId = "strIngredient" + i;
        if (mealData[IngredientId] !== "" && mealData[IngredientId] !== null) {
            var ingredientName = mealData[IngredientId];
            var li = document.createElement('li');
            let image = document.createElement('img');
            image.setAttribute('src','mealdb_assets/food.png')
            li.appendChild(image);
            li.innerHTML += ingredientName;
            ingredient__list.appendChild(li);
        }
    }

    //Add video to DOM
    var embedLink = mealData.strYoutube.split("/")[3].split("=")[1];
    meal_video.innerHTML = `<iframe width="100%" height="500px" src="https://www.youtube.com/embed/${embedLink}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}
