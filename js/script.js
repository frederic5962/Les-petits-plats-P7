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
import { performRecipeSearch, filterRecipesByTags } from '../utils/popResult.js';
import { handleSelectionClick } from '../utils/handleClick.js';
import { createRecipeCard, displaySearchResults } from '../components/recipeCard.js';

document.addEventListener('DOMContentLoaded', function () {
  const recipeCardsDisplay = document.getElementById('recipe-cards');

  if (!recipeCardsDisplay) {
    console.error('Element "recipe-cards" non trouvé');
    return;
  }

  // Fonction de recherche principale
  function performMainSearch(searchTerm, exactMatch = false) {
      // Vérifie la longueur de l'entrée
  if (searchTerm.length < 3) {
    resetSearchResults();
    return;
  }
    let searchResults = filterRecipesByTags(recipes, selectedTags);
    searchResults = searchResults.filter(recipe => {
      const nameMatch = exactMatch
        ? recipe.name.toLowerCase().includes(searchTerm)
        : recipe.name.toLowerCase().includes(searchTerm);
      const descriptionMatch = exactMatch
        ? recipe.description.toLowerCase().includes(searchTerm)
        : recipe.description.toLowerCase().includes(searchTerm);
      const ingredientsMatch = recipe.ingredients.some(ingredient =>
        exactMatch
          ? ingredient.ingredient.toLowerCase().includes(searchTerm)
          : ingredient.ingredient.toLowerCase().includes(searchTerm)
      );
      return nameMatch || descriptionMatch || ingredientsMatch;
    });
    displaySearchResults(searchResults);
  }

  const mainSearchBar = document.querySelector('.recherche-custom');
  const clearButton = document.querySelector('.clear-button');
  const searchButton = document.querySelector('.btn-search');
  const subSearchButtons = document.querySelectorAll('.btn-search-inside'); // Boutons de recherche dans les sous-menus

  // Fonction pour afficher/masquer le bouton "X" en fonction de la saisie
  mainSearchBar.addEventListener('input', () => {
    const searchTerm = mainSearchBar.value.trim().toLowerCase();
    clearButton.style.display = searchTerm !== '' ? 'block' : 'none';
  });

  // Fonction pour effacer la saisie dans la barre de recherche
  clearButton.addEventListener('click', () => {
    mainSearchBar.value = '';
    clearButton.style.display = 'none'; // Masquer le bouton après effacement
    resetSearchResults(); // Réinitialiser les recettes et le compteur
  });

  // Ajouter un écouteur d'événements au bouton "Rechercher" pour valider la recherche lorsqu'il est cliqué
  searchButton.addEventListener('click', () => {
    const searchTerm = mainSearchBar.value.trim().toLowerCase();
    performMainSearch(searchTerm, false);
  });

  // Ajouter un écouteur d'événements pour valider la recherche avec la touche "Entrée"
  mainSearchBar.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Empêcher la soumission par défaut du formulaire
      const searchTerm = mainSearchBar.value.trim().toLowerCase();
      performMainSearch(searchTerm, false);
    }
  });

  // Ajouter des écouteurs d'événements aux boutons de recherche des sous-menus
  subSearchButtons.forEach(button => {
    button.addEventListener('click', () => {
      const subMenu = button.closest('.dropdown-menu');
      const input = subMenu.querySelector('.dropdown-search');
      const searchTerm = input.value.trim().toLowerCase();
      performMainSearch(searchTerm, false); // Autoriser une recherche par mots-clés pour des résultats plus larges
    });
  });

  // Ajouter un écouteur d'événements pour valider la recherche avec la touche "Entrée" dans les sous-menus
  const subSearchInputs = document.querySelectorAll('.dropdown-search');
  subSearchInputs.forEach(input => {
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Empêcher la soumission par défaut du formulaire
        const searchTerm = input.value.trim().toLowerCase();
        performMainSearch(searchTerm, false); // Autoriser une recherche par mots-clés pour des résultats plus larges
      }
    });
  });

  clearButton.style.display = 'none'; // Masquer le bouton par défaut

  const tagsIngredients = getUniqueIngredients().sort();
  const tagsAppareils = getUniqueAppareils().sort();
  const tagsUstensiles = getUniqueUstensiles().sort();

  ajouterTags('ingredients-tags', tagsIngredients);
  ajouterTags('appareils-tags', tagsAppareils);
  ajouterTags('ustensiles-tags', tagsUstensiles);

  performRecipeSearch();

  const searchInputs = document.querySelectorAll('.dropdown-search');
  const clearButtons = document.querySelectorAll('.btn-clear-search');

  searchInputs.forEach((input, index) => {
    const clearButton = clearButtons[index];
    input.addEventListener('input', () => {
      clearButton.style.display = input.value.trim() !== '' ? 'block' : 'none';
      validateSubMenuSearch(input); // Appel de la fonction de validation pour chaque saisie
    });

    clearButton.addEventListener('click', () => {
      input.value = '';
      clearButton.style.display = 'none'; // Masquer le bouton après effacement
      input.dispatchEvent(new Event('input'));
      resetSearchResults();
    });

    clearButton.style.display = 'none'; // Masquer le bouton par défaut
  });

  function validateSubMenuSearch(input) {
    const searchTerm = input.value.trim().toLowerCase();
    const subMenu = input.closest('.dropdown-menu');
    const tagsList = subMenu.querySelector('.tags-list');
    const category = subMenu
      .getAttribute('aria-labelledby')
      ?.replace('dropdownMenuButton', '');

    let sortedTags;
    if (category === '1') sortedTags = getUniqueIngredients();
    else if (category === '2') sortedTags = getUniqueAppareils();
    else if (category === '3') sortedTags = getUniqueUstensiles();

    if (!sortedTags) {
      console.error('Tags triés sont undefined pour la catégorie:', category);
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
      a.addEventListener('click', event => {
        event.preventDefault();
        handleSelectionClick(tag, category);
        input.value = '';
        validateSubMenuSearch(input); // Réinitialiser les résultats après sélection
      });
      li.appendChild(a);
      tagsList.appendChild(li);
    });
  }

  function resetSearchResults() {
    selectedTags.ingredients = [];
    selectedTags.appareils = [];
    selectedTags.ustensiles = [];
    displaySearchResults(recipes);
    updateRecipeCount(recipes.length);
    console.log(
      'Recherche réinitialisée, tous les tags sélectionnés ont été effacés et toutes les recettes sont affichées.'
    );
  }

  if (recipes) {
    recipes.forEach(recipeData => {
      const card = createRecipeCard(recipeData);
      recipeCardsDisplay.appendChild(card);
    });
    updateRecipeCount(recipes.length);
  } else {
    console.error('Les données de recettes ne sont pas disponibles.');
  }
});
