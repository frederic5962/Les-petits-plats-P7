import { performRecipeSearch } from './popResult.js';

// Déclaration d'un objet global pour stocker les tags sélectionnés
export const selectedTags = {
  ingredients: [],
  appareils: [],
  ustensiles: [],
};

/**
 * Gère la sélection des tags.
 * @param {string} tag Le tag sélectionné.
 * @param {string} category La catégorie du tag ('1' pour les ingrédients, '2' pour les appareils, '3' pour les ustensiles).
 */
export function handleSelectionClick(tag, category) {
  // Convertit la catégorie en string si nécessaire
  if (typeof category === 'number') {
    category = category.toString();
  }

  // Ajoute ou supprime le tag de la liste des tags sélectionnés en fonction de la catégorie
  if (category === '1') {
    toggleTag(selectedTags.ingredients, tag);
  } else if (category === '2') {
    toggleTag(selectedTags.appareils, tag);
  } else if (category === '3') {
    toggleTag(selectedTags.ustensiles, tag);
  }

  // Met à jour l'affichage des tags sélectionnés
  displaySelectedTags();
}

/**
 * Ajoute ou supprime un tag de la liste.
 * @param {string} tagList La liste des tags.
 * @param {string} tag Le tag à ajouter ou supprimer.
 */
function toggleTag(tagList, tag) {
  const index = tagList.indexOf(tag);
  if (index === -1) {
    // Ajoute le tag s'il n'existe pas déjà
    tagList.push(tag);
  } else {
    // Supprime le tag s'il existe déjà
    tagList.splice(index, 1);
  }

  // Met à jour les résultats de la recherche
  performRecipeSearch();
}

/**
 * Affiche les tags sélectionnés sous le menu.
 */
function displaySelectedTags() {
  const selectedTagsContainer = document.querySelector('.selected-tags-container');
  selectedTagsContainer.innerHTML = ''; // Efface les tags précédents

  // Parcourt les catégories de tags
  Object.keys(selectedTags).forEach(category => {
    // Parcourt les tags sélectionnés pour chaque catégorie
    selectedTags[category].forEach(tag => {
      // Crée un élément pour le tag
      const tagElement = document.createElement('div');
      tagElement.className = 'tag';

      // Ajoute un <span> pour le texte du tag
      const tagText = document.createElement('span');
      tagText.className = 'tag-text';
      tagText.textContent = tag;

      // Crée un bouton pour supprimer le tag
      const closeButton = document.createElement('span');
      closeButton.className = 'close';
      closeButton.textContent = '×';
      closeButton.onclick = function() {
        removeSelectedTag(tag, category);
      };

      // Ajoute le texte du tag et le bouton de suppression à l'élément du tag
      tagElement.appendChild(tagText);
      tagElement.appendChild(closeButton);

      // Ajoute l'élément du tag au conteneur des tags sélectionnés
      selectedTagsContainer.appendChild(tagElement);
    });
  });
}

/**
 * Retire un tag sélectionné et met à jour les résultats de la recherche.
 * @param {string} tag Le tag à retirer.
 * @param {string} category La catégorie du tag.
 */
function removeSelectedTag(tag, category) {
  // Retire le tag de la liste des tags sélectionnés
  toggleTag(selectedTags[category], tag);

  // Met à jour les résultats de la recherche
  performRecipeSearch();

  // Met à jour l'affichage des tags sélectionnés
  displaySelectedTags();
}