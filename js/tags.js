// js/tags.js
import {recipes} from '../data/recipes.js';

 export function getUniqueIngredients() {
  const tagsIngredients = new Set();
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      tagsIngredients.add(ingredient.ingredient);
    });
  });
  return Array.from(tagsIngredients);
}

 export function ajouterTags(idElement, tags) {
  const ul = document.getElementById(idElement);
  tags.forEach(tag => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = tag;
    li.appendChild(a);
    ul.appendChild(li);
  });
}

