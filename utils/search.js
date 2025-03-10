import { recipes } from '../data/recipes.js';
import { displaySearchResults } from '../components/recipeCard.js';
import { trieParDivion } from './searchBinary.js'; // Assurez-vous que le chemin d'importation est correct

/**
 * Effectue la recherche principale et affiche les résultats.
 * @param {HTMLInputElement} mainSearchInput L'élément input de la recherche principale.
 */
export function performMainSearch(mainSearchInput) {
  const searchTerm = mainSearchInput.value.trim();

  if (searchTerm.length >= 3) {
    // Nettoyer la valeur de la recherche pour éviter les injections
    const cleanedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9\s]/g, '');

    // Appliquer l'algorithme de recherche binaire (adapté pour la recherche principale)
    const searchResults = trieParDivion(recipes, cleanedSearchTerm); // Assurez-vous que trieParDivion est importé correctement

    // Afficher les résultats
    displaySearchResults(searchResults);
  } else {
    // Afficher toutes les recettes si la recherche est trop courte
    displaySearchResults(recipes);
  }
}