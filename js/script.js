// Importations nécessaires
import { selectedTags } from '../utils/handleClick.js';
import { updateRecipeCount } from '../utils/updateCount.js';
import {
  getUniqueIngredients,
  getUniqueAppareils,
  getUniqueUstensiles,
  ajouterTags,
} from '../utils/tags.js';
import { recipes } from '../data/recipes.js';
import { trieParDivion } from '../utils/searchBinary.js';
import { performRecipeSearch } from '../utils/popResult.js';
import { handleSelectionClick } from '../utils/handleClick.js';
import { createRecipeCard, displaySearchResults } from '../components/recipeCard.js'; 

// Fonction principale
document.addEventListener('DOMContentLoaded', function () {
  const recipeCardsDisplay = document.getElementById('recipe-cards');

  if (!recipeCardsDisplay) {
    console.error('Element "recipe-cards" non trouvé');
    return;
  }

  const tagsIngredients = getUniqueIngredients().sort();
  const tagsAppareils = getUniqueAppareils().sort();
  const tagsUstensiles = getUniqueUstensiles().sort();

  ajouterTags('ingredients-tags', tagsIngredients);
  ajouterTags('appareils-tags', tagsAppareils);
  ajouterTags('ustensiles-tags', tagsUstensiles);

  performRecipeSearch();

  const searchInputs = document.querySelectorAll('.dropdown-search');
  const clearButtons = document.querySelectorAll('.btn-clear-search');
  
  document.querySelectorAll('.dropdown-search').forEach(input => {
    input.addEventListener('input', validateSubMenuSearch);
  }); 

  searchInputs.forEach((input, index) => {
    const clearButton = clearButtons[index];

    input.addEventListener('input', function () {
      if (input.value.trim() !== '') {
        clearButton.style.display = 'block';
      } else {
        clearButton.style.display = 'none';
      }
    });

    clearButton.addEventListener('click', function () {
      input.value = '';
      input.dispatchEvent(new Event('input'));
      resetSearchResults(); // Appel à la fonction de réinitialisation
    });

    clearButton.style.display = 'none';
  });

  function validateSubMenuSearch(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    const subMenu = event.target.closest('.dropdown-menu');
    const tagsList = subMenu.querySelector('.tags-list');
    const buttonId = subMenu.getAttribute('aria-labelledby');

    let category;
    if (buttonId) {
      category = buttonId.replace('dropdownMenuButton', '');
    }

    let sortedTags;
    if (category === '1') {
      sortedTags = getUniqueIngredients();
    } else if (category === '2') {
      sortedTags = getUniqueAppareils();
    } else if (category === '3') {
      sortedTags = getUniqueUstensiles();
    }

    if (!sortedTags) {
      console.error('Tags triés sont undefined pour la catégorie:', category);
      return;
    }

    const regex = new RegExp(searchTerm, 'i'); // 'i' pour ignorer la casse
    const searchResults = sortedTags.filter(tag => regex.test(tag));

    tagsList.innerHTML = '';

    searchResults.forEach(tag => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = tag;

      a.addEventListener('click', function (event) {
        event.preventDefault();
        const tag = this.textContent;
        const category = this.closest('.dropdown-menu').dataset.category; 
        handleSelectionClick(tag, category);
        event.target.value = '';
      });

      li.appendChild(a);
      tagsList.appendChild(li);
    });
  }

  function resetSearchResults() {
    // Réinitialiser les tags sélectionnés
    selectedTags.ingredients = [];
    selectedTags.appareils = [];
    selectedTags.ustensiles = [];

    // Réinitialiser les résultats de recherche pour afficher toutes les recettes
    displaySearchResults(recipes);
    updateRecipeCount(recipes.length);

    console.log('Recherche réinitialisée, tous les tags sélectionnés ont été effacés et toutes les recettes sont affichées.');
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
});
