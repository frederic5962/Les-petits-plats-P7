import { recipes } from '../data/recipes.js';
import { handleSelectionClick } from '../utils/handleClick.js';

export function getUniqueIngredients() {
  const tagsIngredients = new Set();
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      tagsIngredients.add(ingredient.ingredient);
    });
  });
  return Array.from(tagsIngredients);
}

export function getUniqueAppareils() {
  const tagsAppareils = new Set();
  recipes.forEach(recipe => {
    tagsAppareils.add(recipe.appliance);
  });
  return Array.from(tagsAppareils);
}

export function getUniqueUstensiles() {
  const tagsUstensiles = new Set();
  recipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      tagsUstensiles.add(ustensil);
    });
  });
  return Array.from(tagsUstensiles);
}

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
    li.appendChild(a);
    ul.appendChild(li);

    a.addEventListener('click', function (event) {
      event.preventDefault();
      const tag = this.textContent; 
      const dropdownMenu = this.closest('.dropdown-menu');
      const category = dropdownMenu ? dropdownMenu.getAttribute('data-category') : undefined;
      console.log(`Tag sélectionné: ${tag}, Catégorie: ${category}`);
      handleSelectionClick(tag, category);
      a.setAttribute('aria-label', `Sélectionner le tag ${tag}`);
    });
  });
  console.log(`Tags ajoutés à l'élément avec ID: ${idElement}`, tags);
}
