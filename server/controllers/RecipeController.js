const axios = require('axios');
const { Recipe } = require("../models");  //DEVELOPMENT

module.exports = class RecipeController {

  static async recipes(req, res, next) {

    const options = {
      method: 'GET',
      url: 'https://low-carb-recipes.p.rapidapi.com/search',
      params: {
        maxPrepareTime: '10',
        maxCookTime: '20',
        maxCalories: '500',
        maxNetCarbs: '5',
        maxSugar: '3',
        maxAddedSugar: '0',
        limit: '20'
      },
      headers: {
        'X-RapidAPI-Key': `${process.env.RECIPES_API_KEY}`,
        'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const recipes = response.data;
      const mappedRecipes = recipes.map((recipe, index) => {
        return {
          id: ++index, // Increment the counter and assign the new ID
          name: recipe.name,
          description: recipe.description,
          prepareTime: recipe.prepareTime,
          cookTime: recipe.cookTime,
          ingredients: recipe.ingredients.map(ingredient => `${ingredient.name} ${ingredient.servingSize.desc}`),
          steps: recipe.steps,
          nutrients: {
            caloriesKCal: recipe.nutrients.caloriesKCal,
            totalCarbs: recipe.nutrients.totalCarbs,
            sugar: recipe.nutrients.sugar,
            protein: recipe.nutrients.protein,
            fat: recipe.nutrients.fat,
            cholesterol: recipe.nutrients.cholesterol,
            alcohol: recipe.nutrients.alcohol,
            gluten: recipe.nutrients.gluten,
          },
          image: recipe.image,
        }
      })

      res.status(200).json(mappedRecipes);
    } catch (error) {
      next(error);
    }
  }


  static async recipeById(req, res, next) {

    const options = {
      method: 'GET',
      url: 'https://low-carb-recipes.p.rapidapi.com/search',
      params: {
        maxPrepareTime: '10',
        maxCookTime: '20',
        maxCalories: '500',
        maxNetCarbs: '5',
        maxSugar: '3',
        maxAddedSugar: '0',
        limit: '20'
      },
      headers: {
        'X-RapidAPI-Key': `${process.env.RECIPES_API_KEY}`,
        'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const recipes = response.data;
      const mappedRecipes = recipes.map((recipe, index) => {
        return {
          id: ++index, // Increment the counter and assign the new ID
          name: recipe.name,
          description: recipe.description,
          prepareTime: recipe.prepareTime,
          cookTime: recipe.cookTime,
          ingredients: recipe.ingredients.map(ingredient => `${ingredient.name} ${ingredient.servingSize.desc}`),
          steps: recipe.steps,
          nutrients: {
            caloriesKCal: recipe.nutrients.caloriesKCal,
            totalCarbs: recipe.nutrients.totalCarbs,
            sugar: recipe.nutrients.sugar,
            protein: recipe.nutrients.protein,
            fat: recipe.nutrients.fat,
            cholesterol: recipe.nutrients.cholesterol,
            alcohol: recipe.nutrients.alcohol,
            gluten: recipe.nutrients.gluten,
          },
          image: recipe.image,
        }
      })

      const recipe = await mappedRecipes.findByPk(req.params.id)
      console.log(recipe)
      res.status(200).json(recipe);
    } catch (error) {
      // next(error);
      console.log(error)
    }
  }





  /*
    ==================== DEVELOPMENT ========================
  */
  static async getRecDb(req, res, next) {
    try {
      const recipes = await Recipe.findAll();
      res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  }

  static async getRecDbId(req, res, next) {
    try {
      const { id } = req.params;
      const recipes = await Recipe.findByPk(id);

      if (!recipes) {
        next({ name: 'NotFound', message: "Recipe not found" });
        return;
      }

      res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  }

//================================================================

}