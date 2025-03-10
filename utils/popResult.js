import { displaySearchResults } from '../components/recipeCard.js';
import { selectedTags } from './handleClick.js';
import { recipes } from '../data/recipes.js';

/**
 * Filtre les recettes en fonction des tags sélectionnés.
 * @param {object} recipes Les recettes à filtrer.
 * @param {object} selectedTags Les tags sélectionnés.
 * @returns {object} Les recettes filtrées.
 */
function filterRecipesByTags(recipes, selectedTags) {
  return recipes.filter(recipe => {
    // Vérifie si la recette contient tous les ingrédients sélectionnés
    const hasIngredients = selectedTags.ingredients.length === 0 || selectedTags.ingredients.every(tag =>
      recipe.ingredients.some(ingredient =>
        typeof ingredient.ingredient === 'string' && ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
      )
    );

    // Vérifie si la recette utilise l'appareil sélectionné
    const hasAppareils = selectedTags.appareils.length === 0 || selectedTags.appareils.some(tag =>
      typeof recipe.appliance === 'string' && recipe.appliance.toLowerCase().includes(tag.toLowerCase())
    );

    // Vérifie si la recette utilise les ustensiles sélectionnés
    const hasUstensiles = selectedTags.ustensiles.length === 0 || selectedTags.ustensiles.some(tag =>
      recipe.ustensils.some(ustensil =>
        typeof ustensil === 'string' && ustensil.toLowerCase().includes(tag.toLowerCase())
      )
    );

    // La recette est valide si elle remplit toutes les conditions
    return hasIngredients && hasAppareils && hasUstensiles;
  });
}

/**
 * Effectue la recherche de recettes en fonction des tags sélectionnés.
 */
export function performRecipeSearch() {
  const searchResults = filterRecipesByTags(recipes, selectedTags);
  displaySearchResults(searchResults);
}