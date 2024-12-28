document.addEventListener('DOMContentLoaded', function() {
  const recipeCardsContainer = document.getElementById('recipe-cards');

  if (typeof recipes !== 'undefined') {
      recipes.forEach(recipeData => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
              <img src="assets/${recipeData.image}" class="card-img-top" alt="${recipeData.name}">
              <div class="card-body">
                  <h5 class="card-title">${recipeData.name}</h5>
                  <p class="card-text">Temps: ${recipeData.time} min</p>
                  <p class="card-text">Ingrédients: ${recipeData.ingredients.map(ingredient => `${ingredient.ingredient}${ingredient.quantity ? ` (${ingredient.quantity}${ingredient.unit || ''})` : ''}`).join(', ')}</p>
                  <p class="card-text">${recipeData.description}</p>
              </div>
          `;
          recipeCardsContainer.appendChild(card);
      });
  } else {
      console.error("Les données de recettes ne sont pas disponibles.");
  }
});
