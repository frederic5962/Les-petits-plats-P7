import { updateRecipeCount } from '../utils/updateCount.js';

export function displaySearchResults(searchResults) {
  const recipeCardsDisplay = document.querySelector('.recipe-cards');
  recipeCardsDisplay.innerHTML = ''; // Effacer les cartes existantes

  if (searchResults.length === 0) {
    // Afficher un message si aucun résultat n'est trouvé
    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = 'Aucune recette ne correspond à votre recherche.';
    recipeCardsDisplay.appendChild(noResultsMessage);
  } else {
    // Afficher un message de chargement
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Chargement des résultats...';
    recipeCardsDisplay.appendChild(loadingMessage);

    // Afficher les cartes de recettes correspondantes
    setTimeout(() => {
      recipeCardsDisplay.innerHTML = ''; // Effacer le message de chargement
      searchResults.forEach(recipeData => {
        const card = createRecipeCard(recipeData);
        recipeCardsDisplay.appendChild(card);
      });
      updateRecipeCount(searchResults.length); // Mettre à jour le compteur de recettes
    }, 500); // Simuler un délai de chargement
  }
}

export function createRecipeCard(recipeData) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="image-container">
      <img src="assets/medias/${recipeData.image}" class="card-img-top" alt="${
    recipeData.name
  }" onerror="this.src='assets/medias/default-image.png';">
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
              ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : ''
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
