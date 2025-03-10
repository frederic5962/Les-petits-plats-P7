import { recipes } from '../data/recipes.js';
import { handleSelectionClick } from './handleClick.js';

/**
 * Récupère la liste unique des ingrédients de toutes les recettes.
 * @returns {string} Un tableau contenant les ingrédients uniques.
 */
export function getUniqueIngredients() {
  const uniqueIngredients = new Set();

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      uniqueIngredients.add(ingredient.ingredient);
    });
  });

  return Array.from(uniqueIngredients);
}

/**
 * Récupère la liste unique des appareils de toutes les recettes.
 * @returns {string} Un tableau contenant les appareils uniques.
 */
export function getUniqueAppareils() {
  const uniqueAppareils = new Set();

  recipes.forEach(recipe => {
    uniqueAppareils.add(recipe.appliance);
  });

  return Array.from(uniqueAppareils);
}

/**
 * Récupère la liste unique des ustensiles de toutes les recettes.
 * @returns {string} Un tableau contenant les ustensiles uniques.
 */
export function getUniqueUstensiles() {
  const uniqueUstensiles = new Set();

  recipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      uniqueUstensiles.add(ustensil);
    });
  });

  return Array.from(uniqueUstensiles);
}

/**
 * Ajoute des tags à un élément HTML.
 * @param {string} idElement L'ID de l'élément HTML auquel ajouter les tags.
 * @param {string} tags Un tableau contenant les tags à ajouter.
 */
export function ajouterTags(idElement, tags) {
  const ul = document.getElementById(idElement);

  if (!ul) {
    console.error(`Element with ID "${idElement}" not found.`);
    return;
  }

  tags.forEach(tag => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = '#';
    a.textContent = tag;
    a.setAttribute('aria-label', `Sélectionner le tag ${tag}`); // Amélioration : aria-label ajouté directement

    a.addEventListener('click', function (event) {
      event.preventDefault();

      const tag = this.textContent;
      const dropdownMenu = this.closest('.dropdown-menu');
      const category = dropdownMenu ? dropdownMenu.getAttribute('data-category') : undefined;

      handleSelectionClick(tag, category);
    });

    li.appendChild(a);
    ul.appendChild(li);
  });

  console.log(`Tags ajoutés à l'élément avec ID: ${idElement}`, tags);
}