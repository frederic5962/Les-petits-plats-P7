import { recipes } from '../data/recipes.js';
class recipe {
    constructor (id, image, name, servings, ingredients, time, description, appliance, ustensils) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.ustensils = ustensils;
    }
}

class recipeFactory {
    static createRecipe (data) {
        return new recipe (data.id, data.image, data.name, data.servings, 
            data.ingredients, data.time, data.description, data.appliance, data.ustensils);
    }
}

export { recipes, recipeFactory };