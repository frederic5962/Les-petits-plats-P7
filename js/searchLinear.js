function linearSearch(recipes, searchTerm) {
  const results = [];
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const lowerCaseRecipeName = recipe.name.toLowerCase();
    const lowerCaseRecipeDescription = recipe.description.toLowerCase();
    const ingredientsMatch = recipe.ingredients.some(ingredient =>
      ingredient.ingredient.toLowerCase().includes(lowerCaseSearchTerm)
    );

    if (
      lowerCaseRecipeName.includes(lowerCaseSearchTerm) ||
      lowerCaseRecipeDescription.includes(lowerCaseSearchTerm) ||
      ingredientsMatch
    ) {
      results.push(recipe);
    }
  }

  return results;
}

export default linearSearch;
