
import { recipeParams } from "./consts";

export interface OptionParams {
  cuisineType?: string;
  q?: string;
  random?: boolean;
  mealType?: string;
  paginationUrl?: string;
  health?: string;
}

const typeGuard = (value: string | boolean) => {
  if (value !== undefined && typeof value === 'boolean') {
    return String(value);
  }
  return '';
};

const url = function (option: OptionParams) {
  let url: URL = new URL('https://api.edamam.com/api/recipes/v2');

  if (option.paginationUrl) {
    url = new URL(option.paginationUrl);
  }

  url.searchParams.append('app_id', recipeParams.appId);
  url.searchParams.append('app_key', recipeParams.apiKey);
  url.searchParams.append('type', 'public');

  if(option.health){
    url.searchParams.append(recipeParams.health, option.health)
  }

  if (option.q) {
    url.searchParams.append(recipeParams.q, option.q);
  }

  if (option.cuisineType) {
    url.searchParams.append(recipeParams.cuisineType, option.cuisineType);
  }

  if (option.random) {
    url.searchParams.append(recipeParams.random, typeGuard(option.random));
  }

  if (option.mealType) {
    url.searchParams.append(recipeParams.mealType, 'lunch');
  }

  return url;
};

export { url };
