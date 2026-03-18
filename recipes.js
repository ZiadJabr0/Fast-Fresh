async function loadFilters() {
    const categoryRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
    const areaRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");

    const categories = await categoryRes.json();
    const areas = await areaRes.json();

    const categorySelect = document.getElementById("categoryFilter");
    const areaSelect = document.getElementById("areaFilter");

    categories.meals.forEach(c => {
        const option = document.createElement("option");
        option.value = c.strCategory;
        option.textContent = c.strCategory;
        categorySelect.appendChild(option);
    });

    areas.meals.forEach(a => {
        const option = document.createElement("option");
        option.value = a.strArea;
        option.textContent = a.strArea;
        areaSelect.appendChild(option);
    });
}

function resetFilters() {
    document.getElementById("recipeSearch").value = "";
    document.getElementById("categoryFilter").value = "";
    document.getElementById("areaFilter").value = "";
    document.getElementById("ingredientFilter").value = "";
    document.getElementById("recipes").innerHTML = "";
}

window.onload = loadFilters;

async function searchRecipe() {
    const query = document.getElementById("recipeSearch").value.trim();
    const category = document.getElementById("categoryFilter").value;
    const area = document.getElementById("areaFilter").value;
    const ingredient = document.getElementById("ingredientFilter").value;

    let url = "";

    if (query) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    } else if (ingredient) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    } else if (category) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    } else if (area) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    } else {
        alert("Please enter a search term or select a filter.");
        return;
    }

    const response = await fetch(url);
    const data = await response.json();

    const recipesDiv = document.getElementById("recipes");
    recipesDiv.innerHTML = "";

    if (data.meals) {
        data.meals.forEach(meal => {
            const card = document.createElement("div");
            card.className = "recipe-card";

            // FIX: Changed onclick to showRecipeDetails so the window actually opens
            card.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">
                ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ""}
                <br>
                <button onclick="showRecipeDetails('${meal.idMeal}')">View Full Recipe</button>
            `;

            recipesDiv.appendChild(card);
        });
    } else {
        recipesDiv.innerHTML = "<p>No recipes found.</p>";
    }
}

// 3. Floating Window Logic
async function showRecipeDetails(mealId) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    const meal = data.meals[0];

    // FIX: Updated to 'floatingWindow' to match your HTML
    const modal = document.getElementById("floatingWindow");

    let ingredientsList = [];
    let ingredientsHTML = "<ul>";

    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (name && name.trim() !== "") {
            const item = `${name} - ${measure}`;
            ingredientsList.push(item);
            ingredientsHTML += `<li>${item}</li>`;
        }
    }
    ingredientsHTML += "</ul>";

    // Standardize string for LocalStorage
    const jsonItems = JSON.stringify(ingredientsList).replace(/'/g, "&apos;");

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" style="width:100%; max-width:400px; border-radius:8px;">
            <h3>Ingredients</h3>
            ${ingredientsHTML}
            <h3>Instructions</h3>
            <p style="text-align:left;">${meal.strInstructions}</p>
            <div style="margin-top:20px;">
                <button onclick='saveToLocalStorage(${jsonItems})' style="background: #28a745; color:white; padding:10px; cursor:pointer; border:none; border-radius:5px;">🛒 Add to Shopping List</button>
                <button onclick="closeModal()" style="padding:10px; cursor:pointer; margin-left:10px;">Close</button>
            </div>
        </div>
    `;
    modal.style.display = "block";
}

// 4. Helper Functions
function closeModal() {
    // FIX: Updated to 'floatingWindow' to match your HTML
    document.getElementById("floatingWindow").style.display = "none";
}

// Close modal if user clicks outside the content box
window.onclick = function (event) {
    let modal = document.getElementById("floatingWindow");
    if (event.target == modal) closeModal();
}

function saveToLocalStorage(items) {
    let currentList = JSON.parse(localStorage.getItem("shoppingList")) || [];

    items.forEach(itemString => {
        currentList.push({
            name: itemString,
        });
    });

    localStorage.setItem("shoppingList", JSON.stringify(currentList));
    alert("Ingredients added to your Shopping List!");
}