document.addEventListener('DOMContentLoaded', function () {
  const recipeCardsContainer = document.getElementById('recipe-cards');

  if (typeof recipes !== 'undefined') {
    recipes.forEach(recipeData => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
                <div class="image-container">
                    <img src="assets/medias/${
                      recipeData.image
                    }" class="card-img-top" alt="${recipeData.name}">
                    <p class="card-time">${recipeData.time}min</p>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${recipeData.name}</h5>
                    <div class="card-recipe-title">RECETTE</div>
                    <p class="card-recipe">${recipeData.description}</p>
                    <div class="card-ingredients-title">INGRÉDIENTS</div>
                    <div class="card-ingredients">
                        ${recipeData.ingredients
                          .map(
                            ingredient => `
                            <div class="ingredient-item">
                                <div class="ingredient-name">${
                                  ingredient.ingredient
                                }</div>
                                <div class="ingredient-quantity">${
                                  ingredient.quantity
                                    ? `${ingredient.quantity} ${ingredient.unit || ''}`
                                    : ''
                                }</div>
                            </div>
                        `
                          )
                          .join('')}
                    </div>
                </div>
            `;
      recipeCardsContainer.appendChild(card);
    });
  } else {
    console.error('Les données de recettes ne sont pas disponibles.');
  }
});
