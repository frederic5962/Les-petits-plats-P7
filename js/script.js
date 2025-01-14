import linearSearch from '../js/searchLinear.js';
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
        <img src="assets/medias/${recipeData.image}" class="card-img-top" alt="${recipeData.name}">
        <p class="card-time">${recipeData.time}min</p>
      </div>
      <div class="card-body">
        <h5 class="card-title">${recipeData.name}</h5>
        <div class="card-recipe-title">RECETTE</div>
        <p class="card-recipe">${recipeData.description}</p>
        <div class="card-ingredients-title">INGRÉDIENTS</div>
        <div class="card-ingredients">
          ${recipeData.ingredients.map(ingredient => `
            <div class="ingredient-item">
              <div class="ingredient-name">${ingredient.ingredient}</div>
              <div class="ingredient-quantity">${ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : ''}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    return card;
  }

  // Fonction pour afficher les résultats de recherche
  function displaySearchResults(searchResults) {
    recipeCardsDisplay.innerHTML = ''; // Effacer les cartes existantes

    if (searchResults.length === 0) {
      // Afficher un message si aucun résultat n'est trouvé
      const noResultsMessage = document.createElement('div');
      noResultsMessage.textContent = 'Aucune recette ne correspond à votre recherche.';
      recipeCardsDisplay.appendChild(noResultsMessage);
    } else {
      // Afficher les cartes de recettes correspondantes
      searchResults.forEach(recipeData => {
        const card = createRecipeCard(recipeData);
        recipeCardsDisplay.appendChild(card);
      });
    }
    updateRecipeCount(searchResults.length); // Mettre à jour le compteur de recettes
  }

  // Fonction pour valider la recherche et effacer la barre de recherche
  function validateSearch() {
    const searchValue = searchBar.value.trim();
    if (searchValue.length >= 3) {
      const searchResults = linearSearch(recipes, searchValue);
      displaySearchResults(searchResults);
       searchBar.value = ''; // Effacer l'entrée de la barre de recherche après validation
      searchBar.blur(); // Enlever le focus de la barre de recherche
    } else {
      // Réafficher toutes les recettes si la recherche est trop courte
      recipeCardsDisplay.innerHTML = '';
      recipes.forEach(recipeData => {
        const card = createRecipeCard(recipeData);
        recipeCardsDisplay.appendChild(card);
      });
      updateRecipeCount(recipes.length); // Mettre à jour le compteur de recettes
    }
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

  // Gérer la recherche lors de l'appui sur la touche "Entrée"
  searchBar.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      validateSearch();
    }
  });

  // Gérer la recherche lors du clic sur le bouton de recherche
  searchButton.addEventListener('click', function () {
    validateSearch();
  });
});
