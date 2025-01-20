import { updateRecipeCount } from '../utils/updateCount.js';
import binarySearchInSubMenu from '../js/searchBinary.js';
import { getUniqueIngredients, getUniqueAppareils, getUniqueUstensiles, ajouterTags } from '../js/tags.js'; // Assurez-vous que le chemin est correct
import { recipes } from '../data/recipes.js';

document.addEventListener('DOMContentLoaded', function () {
  const recipeCardsDisplay = document.getElementById('recipe-cards');
  const searchBar = document.querySelector('.recherche-custom');
  const searchButton = document.querySelector('.btn-search');

  const tagsIngredients = getUniqueIngredients().sort();
  const tagsAppareils = getUniqueAppareils().sort();
  const tagsUstensiles = getUniqueUstensiles().sort();

  ajouterTags("ingredients-tags", tagsIngredients);
  ajouterTags("appareils-tags", tagsAppareils);
  ajouterTags("ustensiles-tags", tagsUstensiles);

  // Assurer que tous les champs de recherche des sous-menus sont correctement liés
  document.querySelectorAll('.dropdown-search').forEach(input => {
    input.addEventListener('input', validateSubMenuSearch);
  });

  document.querySelectorAll('.btn-clear-search').forEach(button => {
    button.addEventListener('click', function () {
      const searchInput = button.previousElementSibling;
      searchInput.value = ''; // Effacer l'entrée de recherche
      searchInput.dispatchEvent(new Event('input')); // Déclencher l'événement input pour réinitialiser les résultats
    });
  });

  document.querySelectorAll('.btn-search-inside').forEach(button => {
    button.addEventListener('click', function () {
      const searchInput = button.previousElementSibling.previousElementSibling;
      const searchTerm = searchInput.value.trim();
      if (searchTerm.length >= 3) {
        performRecipeSearch(searchTerm);
        searchInput.value = ''; // Effacer l'entrée de recherche
      }
    });
  });

  function validateSubMenuSearch(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    const subMenu = event.target.closest('.dropdown-menu');
    const tagsList = subMenu.querySelector('.tags-list');
    const buttonId = subMenu.getAttribute('aria-labelledby');

    let category;
    if (buttonId) {
      category = buttonId.split('dropdownMenuButton')[1];
    }

    let sortedTags;
    if (category === '1') {
      sortedTags = tagsIngredients;
    } else if (category === '2') {
      sortedTags = tagsAppareils;
    } else if (category === '3') {
      sortedTags = tagsUstensiles;
    }

    if (!sortedTags) {
      console.error('Tags triés sont undefined pour la catégorie :', category);
      return;
    }

    const searchResults = binarySearchInSubMenu(sortedTags, searchTerm);

    tagsList.innerHTML = ''; // Effacer les résultats existants
    searchResults.forEach(tag => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = tag;
      a.addEventListener('click', function () {
        performRecipeSearch(tag);
        event.target.value = ''; // Effacer l'entrée de recherche
      });
      li.appendChild(a);
      tagsList.appendChild(li);
    });
  }

  function performRecipeSearch(searchTerm) {
    const searchResults = recipes.filter(recipe => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        recipe.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        recipe.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        recipe.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase().includes(lowerCaseSearchTerm)
        )
      );
    });

    displaySearchResults(searchResults);
  }

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

  function displaySearchResults(searchResults) {
    recipeCardsDisplay.innerHTML = ''; // Effacer les cartes existantes

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

  function validateSearch() {
    const searchValue = searchBar.value.trim();
    if (searchValue.length >= 3) {
      const searchResults = binarySearchInSubMenu(recipes, searchValue);
      displaySearchResults(searchResults);
      searchBar.value = ''; // Effacer l'entrée de la barre de recherche après validation
      searchBar.blur(); // Enlever le focus de la barre de recherche
    } else {
      recipeCardsDisplay.innerHTML = '';
      recipes.forEach(recipeData => {
        const card = createRecipeCard(recipeData);
        recipeCardsDisplay.appendChild(card);
      });
      updateRecipeCount(recipes.length);
    }
  }

  if (typeof recipes !== 'undefined') {
    recipes.forEach(recipeData => {
      const card = createRecipeCard(recipeData);
      recipeCardsDisplay.appendChild(card);
    });
    updateRecipeCount(recipes.length);
  } else {
    console.error('Les données de recettes ne sont pas disponibles.');
  }

  searchBar.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      validateSearch();
    }
  });

  searchButton.addEventListener('click', function () {
    validateSearch();
  });
});
