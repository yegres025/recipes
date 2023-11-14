import { url } from '../consts/api-params.ts/recipe-api';
import { OptionParams } from '../consts/api-params.ts/recipe-api';


export interface FullResponeRecipes {
  count: number;
  from: number;
  to: number;
  hits: Recipes[];
  _links: Links
}

export interface Recipes {
  recipe: CurrentRecipe;
  _links: Links;
}

export interface CurrentRecipe {
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
  mainParamsSearch: OptionParams;
}


async function getRecipes({
  mainParamsSearch,

}: GetRecipesParams): Promise<FullResponeRecipes> {


  const response = await fetch(url(mainParamsSearch));
  try {
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }    
    return await response.json();
  } catch (error) {
    throw new Error('Catch err');
  }

}


export { getRecipes };
