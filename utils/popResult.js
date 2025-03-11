// Importations nécessaires
import { displaySearchResults } from '../components/recipeCard.js';
import { selectedTags } from '../utils/handleClick.js';
import { recipes } from '../data/recipes.js';

// Fonctions auxiliaires pour vérifier les tags
function checkIngredients(recipe, selectedTags) {
  return (
    selectedTags.ingredients.length === 0 ||
    selectedTags.ingredients.every(tag => {
      console.log('tag sélectionné :', tag);
      return recipe.ingredients.some(ingredient => {
        console.log('ingredient de la recette:', ingredient.ingredient);
        return (
          typeof ingredient.ingredient === 'string' &&
          ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
        );
      });
    })
  );
}

function checkAppareils(recipe, selectedTags) {
  return (
    selectedTags.appareils.length === 0 ||
    selectedTags.appareils.some(
      tag =>
        typeof recipe.appliance === 'string' &&
        recipe.appliance.toLowerCase().includes(tag.toLowerCase())
    )
  );
}

function checkUstensiles(recipe, selectedTags) {
  return (
    selectedTags.ustensiles.length === 0 ||
    selectedTags.ustensiles.some(tag =>
      recipe.ustensils.some(
        ustensil =>
          typeof ustensil === 'string' &&
          ustensil.toLowerCase().includes(tag.toLowerCase())
      )
    )
  );
}

// Fonction pour filtrer les recettes en fonction des tags sélectionnés
export function filterRecipesByTags(recipes, selectedTags) {
  return recipes.filter(recipe => {
    const hasIngredients = checkIngredients(recipe, selectedTags);
    const hasAppareils = checkAppareils(recipe, selectedTags);
    const hasUstensiles = checkUstensiles(recipe, selectedTags);

    console.log(
      'Résultat du filtre pour la recette :',
      recipe.name,
      hasIngredients,
      hasAppareils,
      hasUstensiles
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
