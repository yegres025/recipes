const recipeParams = {
  cuisineType: 'cuisineType',
  q: 'q',
  random: 'random',
  mealType: 'mealType',
  dishType: 'dishType',
  health: 'health',
  apiKey: 'a652b5dea21fd205364414ec96220750',
  appId: '55db0493',
};

const defaultRandomRecipeParams = {
  cuisineType: 'central europe',
  random: false,
};

const defaultRandomAlcoholParams = {
  health: 'alcohol-cocktail',
  random: true,
};

const defaultRandomAlcoholFreeParams = {
  dishType: 'drinks',
  q: 'fruit juice',
  health: 'alcohol-free',
  random: true
};

export {
  recipeParams,
  defaultRandomRecipeParams,
  defaultRandomAlcoholParams,
  defaultRandomAlcoholFreeParams,
};
