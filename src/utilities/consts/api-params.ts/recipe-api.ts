const apiKey = 'a652b5dea21fd205364414ec96220750';
const appId = '55db0493';

export interface OptionParams {
  cuisineType?: string;
  q?: string;
  random?: boolean;
  mealType?: string;
  paginationUrl?: string;
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

  url.searchParams.append('app_id', appId);
  url.searchParams.append('app_key', apiKey);
  url.searchParams.append('type', 'public');

  if (option.q) {
    url.searchParams.append('q', option.q);
  }

  if (option.cuisineType) {
    url.searchParams.append('cuisineType', option.cuisineType);
  }

  if (option.random) {
    url.searchParams.append('random', typeGuard(option.random));
  }

  if (option.mealType) {
    url.searchParams.append('mealType', 'lunch');
  }

  return url;
};

export { url };
