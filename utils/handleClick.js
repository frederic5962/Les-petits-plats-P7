import { performRecipeSearch } from '../utils/popResult.js';

// Déclaration d'un objet global pour stocker les tags sélectionnés
export const selectedTags = {
  ingredients: [],
  appareils: [],
  ustensiles: [],
};

// Fonction pour gérer la sélection des tags
export function handleSelectionClick(tag, category) {
  console.log(`Tag cliqué: ${tag}, Catégorie: ${category}`);
  const categoryMap = {
    1: 'ingredients',
    2: 'appareils',
    3: 'ustensiles',
  };

  const categoryKey = categoryMap[category.toString()];
  if (categoryKey) {
    toggleTag(selectedTags[categoryKey], tag);
    displaySelectedTags(); // Afficher les tags sélectionnés
  } else {
    console.error(`Catégorie inconnue: ${category}`);
  }
}

// Fonction pour ajouter ou supprimer un tag de la liste
function toggleTag(tagList, tag) {
  const index = tagList.indexOf(tag);
  if (index === -1) {
    tagList.push(tag);
  } else {
    tagList.splice(index, 1); // Supprimer le tag s'il existe déjà dans la liste
  }
  console.log(selectedTags);
  performRecipeSearch();
}

// Fonction pour afficher les tags sélectionnés sous le menu
function displaySelectedTags() {
  const selectedTagsContainer = document.querySelector('.selected-tags-container');
  selectedTagsContainer.innerHTML = '';

  // Afficher les tags pour chaque catégorie
  Object.keys(selectedTags).forEach(category => {
    selectedTags[category].forEach(tag => {
      const tagElement = document.createElement('div');
      tagElement.className = 'tag';

      // Ajouter un <span> pour le texte du tag
      const tagText = document.createElement('span');
      tagText.className = 'tag-text';
      tagText.textContent = tag;

      const closeButton = document.createElement('span');
      closeButton.className = 'close';
      closeButton.textContent = '×';
      closeButton.onclick = function () {
        removeSelectedTag(tag, category);
      };

      tagElement.appendChild(tagText); // Ajouter le texte du tag au conteneur du tag
      tagElement.appendChild(closeButton);
      selectedTagsContainer.appendChild(tagElement);
    });
  });
}

// Fonction pour retirer un tag sélectionné et réinitialiser les résultats
function removeSelectedTag(tag, category) {
  const categoryMap = {
    ingredients: 'ingredients',
    appareils: 'appareils',
    ustensiles: 'ustensiles',
  };

  const categoryKey = categoryMap[category];
  if (categoryKey) {
    // Retirer le tag de la catégorie correspondante
    toggleTag(selectedTags[categoryKey], tag);

    // Réinitialiser les résultats de recherche
    performRecipeSearch();
    displaySelectedTags(); // Mettre à jour l'affichage des tags sélectionnés
  } else {
    console.error(`Catégorie inconnue: ${category}`);
  }
}
