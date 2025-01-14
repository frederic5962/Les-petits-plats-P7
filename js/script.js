import { updateRecipeCount } from '../utils/updateCount.js';

document.addEventListener('DOMContentLoaded', function () {
  const recipeCardsDisplay = document.getElementById('recipe-cards');
  const searchBar = document.querySelector('.recherche-custom');
  const searchButton = document.querySelector('.btn-search');

  // Fonction pour créer une carte de recette
  function createRecipeCard(recipeData) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="image-container">
        <img src="assets/medias/${recipeData.image}" class="card-img-top" alt="${
      recipeData.name
    }">
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
    return card;
  }

  // Afficher toutes les recettes au chargement de la page
  if (typeof recipes !== 'undefined') {
    recipes.forEach(recipeData => {
      const card = createRecipeCard(recipeData);
      recipeCardsDisplay.appendChild(card);
    });

    updateRecipeCount(recipes.length); // Mettre à jour le compteur de recettes au démarrage
  } else {
    console.error('Les données de recettes ne sont pas disponibles.');
  }
});
