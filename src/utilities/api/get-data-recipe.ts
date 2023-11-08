import { url } from '../consts/api-params.ts/recipe-api';

export interface RecipeData {
  recipe: Recipe;
  _links: Links;
}

export interface Recipe {
  calories: number;
  cautions: string[];
  co2EmissionsClass: string;
  cuisineType: string[];
  dietLabels: string[];
  digest: Digest;
  dishType: string[];
  healthLabels: string[];
  image: string;
  images: Images;
  ingredientLines: string[];
  ingredients: Ingredients[];
  label: string;
  mealType: string[];
  shareAs: string;
  source: string;
  totalCO2Emissions: number;
  totalDaily: TotalDailyNutrients;
  totalNutrients: TotalDailyNutrients;
  totalTime: number;
  totalWeight: number;
  uri: string;
  url: string;
  yield: number;
}

interface Links {
  next?: {
    href: string;
    title: string;
  };
}
interface Digest {
  daily: number;
  hasRDI: boolean;
  label: string;
  schemaOrgTag: string;
  sub: SubDigest[];
  tag: string;
  total: number;
  unit: string;
}

interface SubDigest {
  daily: number;
  hasRDI: boolean;
  label: string;
  schemaOrgTag: string;
  tag: string;
  total: number;
  unit: string;
}

interface Images {
  LARGE: SizeImages;
  REGULAR: SizeImages;
  SMALL: SizeImages;
  THUMBNAIL: SizeImages;
}

interface SizeImages {
  height: number;
  url: string;
  width: number;
}

interface Ingredients {
  food: string;
  foodCategory: string;
  foodId: string;
  image: string;
  measure: string;
  quantity: number;
  text: string;
  weight: number;
}

interface TotalDailyNutrients {
  CA: SubTotalDailyNutrients;
  CHOCDF: SubTotalDailyNutrients;
  CHOCDFnet: SubTotalDailyNutrients;
  CHOLE: SubTotalDailyNutrients;
  ENERC_KCAL: SubTotalDailyNutrients;
  FAMS: SubTotalDailyNutrients;
  FAPU: SubTotalDailyNutrients;
  FASAT: SubTotalDailyNutrients;
  FAT: SubTotalDailyNutrients;
  FATRN: SubTotalDailyNutrients;
  FE: SubTotalDailyNutrients;
  FIBTG: SubTotalDailyNutrients;
  FOLAC: SubTotalDailyNutrients;
  FOLDFE: SubTotalDailyNutrients;
  FOLFD: SubTotalDailyNutrients;
  K: SubTotalDailyNutrients;
  MG: SubTotalDailyNutrients;
  NA: SubTotalDailyNutrients;
  NIA: SubTotalDailyNutrients;
  P: SubTotalDailyNutrients;
  PROCNT: SubTotalDailyNutrients;
  RIBF: SubTotalDailyNutrients;
  SUGAR: SubTotalDailyNutrients;
  SUGARadded: SubTotalDailyNutrients;
  THIA: SubTotalDailyNutrients;
  TOCPHA: SubTotalDailyNutrients;
  VITA_RAE: SubTotalDailyNutrients;
  VITB6A: SubTotalDailyNutrients;
  VITB12: SubTotalDailyNutrients;
  VITC: SubTotalDailyNutrients;
  VITD: SubTotalDailyNutrients;
  VITK1: SubTotalDailyNutrients;
  WATER: SubTotalDailyNutrients;
  ZN: SubTotalDailyNutrients;
}

interface SubTotalDailyNutrients {
  label: string;
  quantity: number;
  unit: string;
}

export interface GetRecipesParams {
  mainParamSearch: string;
  nextPaginationStep?: boolean;
  paginationUrl?: string;
}

export interface GetCurrentRecipeParams {
  recipeName: string;
  nextPaginationStep?: boolean;
  paginationUrl?: string;
}

async function getRecipes({
  mainParamSearch,
  nextPaginationStep,
  paginationUrl = '',
}: GetRecipesParams): Promise<RecipeData> {
  if (mainParamSearch !== 'central europe') {
    url.searchParams.set('random', String(false));
    url.searchParams
      .getAll('mealType')
      .forEach(() => url.searchParams.delete('mealType'));
  }

  if (nextPaginationStep) {
    url.href = paginationUrl;
  }
  url.searchParams.delete('q');
  url.searchParams.set('cuisineType', mainParamSearch);

  const response = await fetch(url);
  try {
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error('Catch err');
  }
}

async function getCurrentRecipes({
  recipeName,
  nextPaginationStep,
  paginationUrl = '',
}: GetCurrentRecipeParams): Promise<RecipeData> {
  url.searchParams.delete('random')
  if (nextPaginationStep) {
    url.href = paginationUrl;
  }

  url.searchParams.delete('cuisineType');
  url.searchParams.delete('mealType');
  url.searchParams.set('q', recipeName);

  const response = await fetch(url);

  try {
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch {
    throw new Error(`Catch err`);
  }
}

export { getRecipes, getCurrentRecipes };
