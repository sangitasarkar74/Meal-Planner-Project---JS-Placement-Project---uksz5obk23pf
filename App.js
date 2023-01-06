
var submit = document.getElementById("submit");
var weight = document.getElementById("weight");
var height = document.getElementById("height");
var age = document.getElementById("age");
var form = document.forms["meal_planner_form"];
var gender = document.querySelector(".gender");
var genDerIndex = gender.selectedIndex;
var physicalActivity = document.getElementById("physical-activity");
var activityIndex = physicalActivity.selectedIndex;

submit.addEventListener("click", calorieCalculator);
const submitBtn = document.getElementById('submit');

function calorieCalculator() {
    var genDerIndex = gender.selectedIndex;
    var activityIndex = physicalActivity.selectedIndex;

    if (genDerIndex == 1) {
        if (activityIndex == 1) {
            var bmrMale = parseFloat(66.47 + (13.75 * parseFloat(weight.value)) +
                (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
            var calorie_requirement = bmrMale * 1.375;

            console.log(calorie_requirement);
        } if (activityIndex == 2) {
            var bmrMale = parseFloat(66.47 + (13.75 * parseFloat(weight.value)) +
                (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
            var calorie_requirement = bmrMale * 1.55;

            console.log(calorie_requirement);
        } if (activityIndex == 3) {
            var bmrMale = parseFloat(66.47 + (13.75 * parseFloat(weight.value)) +
                (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
            var calorie_requirement = bmrMale * 1.725;

            console.log(calorie_requirement);

        }

    } else if (genDerIndex == 2) {
        if (activityIndex == 1) {
            var bmrFemale = parseFloat(655.1 + (9.563 * parseFloat(weight.value)) +
                (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
            var calorie_requirement = bmrFemale * 1.375;

            console.log(calorie_requirement);
        } if (activityIndex == 2) {
            var bmrFemale = parseFloat(655.1 + (9.563 * parseFloat(weight.value)) +
                (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
            var calorie_requirement = bmrFemale * 1.55;

            console.log(calorie_requirement);
        } if (activityIndex == 3) {
            var bmrFemale = parseFloat(655.1 + (9.563 * parseFloat(weight.value)) +
                (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
            var calorie_requirement = bmrFemale * 1.725;

            console.log(calorie_requirement);
        }
    }
    fetchAPI(calorie_requirement);


    const element = document.getElementById("card-container");
    element.scrollIntoView({ behavior: 'smooth' });

}

function fetchAPI(targetCalories) {
    fetch(`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&apiKey=3db6164444164e758952c9fecd02a1ea`)
        .then((data) => {
            return data.json();
        })
        .then((response) => {
            console.log(response);
            const meals = response.meals;
            const nutrients = response.nutrients;
            let myData = "";
            meals.forEach(meal => {
                console.log(` ${meal.title}`);
                // console.log(`${meal.id}`);
                getRecipeInformation(meal.id).then((imageUrl) => {
                    myData += `
                <div class="card-item">                     
                    <div class="card-title">
                        <img src="${imageUrl}" alt="${meal.title}">   
                        <h1>${meal.title}</h1>                        
                        <button id="get-recipe" onclick="getRecipeDetails(${meal.id});">Get recipe</button>
                        
                    </div>                   
                </div> `
                    document.getElementById("card").innerHTML = myData;

                });
            })
        })
        .catch(error => {
            console.log(error);
        })
}


function getRecipeDetails(id) {
    const element = document.getElementById("recipe-container");
    element.scrollIntoView({ behavior: 'smooth' });

    console.log("hello");
    document.getElementById('ingredients').innerHTML = "";
    document.getElementById('equipments').innerHTML = "";
    document.getElementById('steps').innerHTML = "";

    ingredients(id).then((data) => {
        console.log(data);
        data.map((result) => {
            console.log(result.steps);
            let stepsData = "";
            result.steps.map((step) => {
                console.log(step);
                stepsData += `                                                        
                <p>  ${step.step} <p>
                 `


                document.getElementById('steps').innerHTML = stepsData;
                // stepsItem.append(stepsData);

                step.equipment.map((equip) => {
                    console.log(equip)
                    let equipdata = "";
                    equipdata = `
                    ${equip.name}                                        
                     `
                    // document.getElementById('ingredients').innerHTML = idData;


                    const ol = document.getElementById('equipments');
                    const li = document.createElement('li');
                    li.textContent = equipdata;
                    ol.append(li);
                });



                step.ingredients.map((ingredient) => {
                    console.log(ingredient);
                    let idData = "";
                    idData = `
                           ${ingredient.name}                                        
                             `
                    // document.getElementById('ingredients').innerHTML = idData;

                    const ul = document.getElementById('ingredients');
                    const li = document.createElement('li');
                    li.textContent = idData;
                    ul.append(li);
                });
            });
        });
    });
}



async function getRecipeInformation(id) {
    const data = await
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=3db6164444164e758952c9fecd02a1ea`)
    const res = await data.json();
    console.log(res);
    return res.image;
}
async function ingredients(id) {
    const result = await
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=3db6164444164e758952c9fecd02a1ea`)
    const data = await result.json();
    // console.log(res);
    return data.analyzedInstructions;
}

var recipeItem = document.getElementById("equipments");
var equipmentHeading = document.createElement("h2");
equipmentHeading.textContent = "Equipments";
