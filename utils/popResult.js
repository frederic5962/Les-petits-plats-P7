// Importations nécessaires
import { displaySearchResults } from '../components/recipeCard.js';
import { selectedTags } from '../utils/handleClick.js';
import { recipes } from '../data/recipes.js';

// Fonction pour filtrer les recettes en fonction des tags sélectionnés
export function filterRecipesByTags(recipes, selectedTags) {
  if (!selectedTags) {
    console.error('Selected tags are undefined.');
    return recipes;
  }

  return recipes.filter(recipe => {
    const hasIngredients = selectedTags.ingredients.length === 0 || // vérifier si le tableau est vide
      selectedTags.ingredients.every(tag =>
        recipe.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
        )
      );

    const hasAppareils = selectedTags.appareils.length === 0 ||
      selectedTags.appareils.some(tag =>
        recipe.appliance.toLowerCase().includes(tag.toLowerCase())
      );

    const hasUstensiles = selectedTags.ustensiles.length === 0 ||
      selectedTags.ustensiles.some(tag =>
        recipe.ustensils.some(ustensil =>
          ustensil.toLowerCase().includes(tag.toLowerCase())
        )
      );

    return hasIngredients && hasAppareils && hasUstensiles;
  });
}

// Fonction pour effectuer la recherche de recettes
export function performRecipeSearch() {
  const searchResults = filterRecipesByTags(recipes, selectedTags); // Appel de la fonction de filtrage
  // Afficher les résultats filtrés
  displaySearchResults(searchResults);
}
