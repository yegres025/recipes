const recipeParams = {
  cuisineType: 'cuisineType',
  q: 'q',
  random: 'random',
  mealType: 'mealType',
  health: 'health',
  apiKey: 'a652b5dea21fd205364414ec96220750',
  appId: '55db0493',
};

const defaultRandomRecipeParams = {
  cuisineType: 'central europe',
  random: true,
};

const defaultRandomAlcoholParams = {
  health: 'alcohol-cocktail',
  random: true,
};

const defaultRandomAlcoholFreeParams = {
  health: 'alcohol-free',
  random: true,
};

export {
  recipeParams,
  defaultRandomRecipeParams,
  defaultRandomAlcoholParams,
  defaultRandomAlcoholFreeParams,
};
