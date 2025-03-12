function linearSearch(recipes, searchTerm) {
  if (!searchTerm) {
    return recipes;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return recipes.filter(recipe => {
    const lowerCaseRecipeName = recipe.name.toLowerCase();
    const lowerCaseRecipeDescription = recipe.description.toLowerCase();

    const ingredientsMatch = recipe.ingredients.some(ingredient =>
      ingredient.ingredient.toLowerCase().includes(lowerCaseSearchTerm)
    );

    return (
      lowerCaseRecipeName.includes(lowerCaseSearchTerm) ||
      lowerCaseRecipeDescription.includes(lowerCaseSearchTerm) ||
      ingredientsMatch
    );
  });
}

export default linearSearch;
