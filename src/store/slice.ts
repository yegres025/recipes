import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetRecipesParams,
  getRecipes,
  CurrentRecipe,
  Recipes,
} from '../utilities/api/get-data-recipe';

export interface InitialState {
  recipes: Recipes[];
  alcoholCocktail: Recipes[];
  alcoholFreeCocktail: Recipes[];
  cuisines: string;
  paginationUrl: string;
  currentRecipes: Recipes | [];
  currentRecipe: CurrentRecipe | null;
  recipeName: string;
  spinnerVisible: boolean;
  showError: boolean;
}

const initialState: InitialState = {
  recipes: [],
  alcoholCocktail: [],
  alcoholFreeCocktail: [],
  cuisines: '',
  paginationUrl: '',
  currentRecipes: [],
  currentRecipe: null,
  recipeName: '',
  spinnerVisible: false,
  showError: false,
};

export const getRecipeThunk = createAsyncThunk(
  'recipes/getRecipeData',
  async ({ mainParamsSearch }: GetRecipesParams, thunkAPI) => {
    try {
      const response = await getRecipes({
        mainParamsSearch,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const mainReducer = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    recipesData(state, action) {
      state.recipes = action.payload;
    },
    nextPaginationStepRecipes(state, action) {
      state.paginationUrl = action.payload;
    },
    recipesDataReset(state) {
      state.recipes = [];
    },
    currentCuisines(state, action) {
      state.cuisines = action.payload;
    },
    saveCurrentRecipe(state, action) {
      state.currentRecipe = action.payload[0].recipe;
    },
    saveRecipeName(state, action) {
      state.recipeName = action.payload;
    },
    errorReset(state) {
      state.showError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipeThunk.pending, (state) => {
        state.spinnerVisible = true;
      })
      .addCase(getRecipeThunk.fulfilled, (state, action) => {
        if (!action.meta.arg.mainParamsSearch.health) {
          state.recipes = state.recipes.concat(action.payload.hits);
        }

        if (action.meta.arg.mainParamsSearch.health === 'alcohol-cocktail') {
          state.alcoholCocktail = state.alcoholCocktail.concat(
            action.payload.hits
          );
          console.log(action.payload);
          
        }

        if (action.meta.arg.mainParamsSearch.health === 'alcohol-free') {
          state.alcoholFreeCocktail = state.alcoholFreeCocktail.concat(
            action.payload.hits
          );
        }

        state.paginationUrl = action.payload._links?.next?.href || '';

        state.spinnerVisible = false;

        if (action.payload.hits.length === 0) {
          state.showError = true;
        }
      })
      .addCase(getRecipeThunk.rejected, (state) => {
        state.spinnerVisible = false;
        state.showError = true;
      });
  },
});

export const {
  recipesData,
  currentCuisines,
  recipesDataReset,
  saveCurrentRecipe,
  saveRecipeName,
  errorReset,
} = mainReducer.actions;

export default mainReducer.reducer;
