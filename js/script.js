import { selectedTags } from '../utils/handleClick.js';
import { updateRecipeCount } from '../utils/updateCount.js';
import {
  getUniqueIngredients,
  getUniqueAppareils,
  getUniqueUstensiles,
  ajouterTags,
} from '../utils/tags.js';
import { recipes } from '../data/recipes.js';
import { handleSelectionClick } from '../utils/handleClick.js';
import { displaySearchResults } from '../components/recipeCard.js';

// Fonction principale
document.addEventListener('DOMContentLoaded', function () {
  const recipeCardsDisplay = document.getElementById('recipe-cards');

  if (!recipeCardsDisplay) {
    console.error('Element "recipe-cards" non trouvé');
    return;
  }

  // Initialisation des tags
  const tagsIngredients = getUniqueIngredients().sort();
  const tagsAppareils = getUniqueAppareils().sort();
  const tagsUstensiles = getUniqueUstensiles().sort();

  ajouterTags('ingredients-tags', tagsIngredients);
  ajouterTags('appareils-tags', tagsAppareils);
  ajouterTags('ustensiles-tags', tagsUstensiles);

  // Affichage initial des recettes
  displaySearchResults(recipes);
  updateRecipeCount(recipes.length);

  // Gestion de la recherche principale
  const mainSearchInput = document.getElementById('main-search');
  const mainClearButton = document.querySelector('.btn-clear-main');

  if (mainSearchInput) {
    mainSearchInput.addEventListener('input', performMainSearch);
    mainSearchInput.addEventListener('input', function () {
      mainClearButton.style.display = mainSearchInput.value.trim() !== '' ? 'block' : 'none';
    });
  } else {
    console.error("L'élément 'main-search' n'a pas été trouvé.");
  }

  // Gestion du bouton "Effacer" de la recherche principale
  if (mainClearButton) {
    mainClearButton.addEventListener('click', function () {
      mainSearchInput.value = '';
      mainSearchInput.dispatchEvent(new Event('input')); // Déclencher la recherche
      resetSearchResults();
    });
    mainClearButton.style.display = 'none'; // Masquer le bouton au départ
  }

  // Gestion de la recherche dans les sous-menus
  document.querySelectorAll('.dropdown-search').forEach(input => {
    input.addEventListener('input', validateSubMenuSearch);
  });

  // Gestion des boutons "Effacer" dans les sous-menus
  const searchInputs = document.querySelectorAll('.dropdown-search');
  const clearButtons = document.querySelectorAll('.btn-clear-search');

  searchInputs.forEach((input, index) => {
    const clearButton = clearButtons[index];

    input.addEventListener('input', function () {
      clearButton.style.display = input.value.trim() !== '' ? 'block' : 'none';
    });

    clearButton.addEventListener('click', function () {
      input.value = '';
      input.dispatchEvent(new Event('input'));
      resetSearchResults();
    });

    clearButton.style.display = 'none';
  });

  // Fonctions pour la recherche
  function performMainSearch() {
    const searchTerm = mainSearchInput.value.trim().toLowerCase();
    const searchResults = recipes.filter(recipe => {
      const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
      const descriptionMatch = recipe.description.toLowerCase().includes(searchTerm);
      const ingredientsMatch = recipe.ingredients.some(ing =>
        ing.ingredient.toLowerCase().includes(searchTerm)
      );
      return nameMatch || descriptionMatch || ingredientsMatch;
    });
    displaySearchResults(searchResults);
  }

  function validateSubMenuSearch(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    const subMenu = event.target.closest('.dropdown-menu');
    const tagsList = subMenu.querySelector('.tags-list');
    const category = subMenu.dataset.category;

    const tagsData = {
      '1': tagsIngredients,
      '2': tagsAppareils,
      '3': tagsUstensiles,
    };
    const sortedTags = tagsData[category];

    if (!sortedTags) {
      console.error('Tags triés non trouvés pour la catégorie :', category);
      return;
    }

    const regex = new RegExp(searchTerm, 'i');
    const searchResults = sortedTags.filter(tag => regex.test(tag));

    tagsList.innerHTML = '';

    searchResults.forEach(tag => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = tag;
      a.setAttribute('aria-label', `Sélectionner le tag ${tag}`);

      a.addEventListener('click', function (event) {
        event.preventDefault();
        handleSelectionClick(tag, category);
        event.target.value = '';
      });

      li.appendChild(a);
      tagsList.appendChild(li);
    });
  }

  // Fonction pour réinitialiser les résultats de recherche
  function resetSearchResults() {
    selectedTags.ingredients = [];
    selectedTags.appareils = [];
    selectedTags.ustensiles = [];

    displaySearchResults(recipes);
    updateRecipeCount(recipes.length);

    searchInputs.forEach(input => {
      input.value = '';
    });
  }
});