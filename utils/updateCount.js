
export function updateRecipeCount(count) {
    const recipeCountDiv = document.querySelector('.recipe-count');
    recipeCountDiv.textContent = `${count} recettes`;
}
