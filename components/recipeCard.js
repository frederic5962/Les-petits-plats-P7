import { updateRecipeCount } from '../utils/updateCount.js';

export function displaySearchResults(searchResults) {
  const recipeCardsDisplay = document.getElementById('recipe-cards'); 
  recipeCardsDisplay.innerHTML = '';

  if (searchResults.length === 0) {
    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = 'Aucune recette ne correspond à votre recherche.';
    recipeCardsDisplay.appendChild(noResultsMessage);
  } else {
    searchResults.forEach(recipeData => {
      const card = createRecipeCard(recipeData);
      recipeCardsDisplay.appendChild(card);
    });
  }
  updateRecipeCount(searchResults.length);
}

export function createRecipeCard(recipeData) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="image-container">
      <img src="assets/medias/${recipeData.image}" class="card-img-top" alt="${recipeData.name}">
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
            <div class="ingredient-name">${ingredient.ingredient}</div>
            <div class="ingredient-quantity">${ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : ''}</div>
          </div>`
          )
          .join('')}
      </div>
    </div>
  `;
  return card;
}
