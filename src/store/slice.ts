import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetRecipesParams,
  getRecipes,
  getCurrentRecipes,
  GetCurrentRecipeParams,
  RecipeData,
  Recipe,
} from '../utilities/api/get-data-recipe';

export interface InitialState {
  recipes: RecipeData[];
  cuisines: string;
  paginationUrl: string;
  currentRecipes: RecipeData | [];
  randomRecipes: RecipeData[];
  currentRecipe: Recipe | null;
  recipeName: string;
  spinnerVisible: boolean;
  showError: boolean
}

const initialState: InitialState = {
  recipes: [],
  cuisines: '',
  paginationUrl: '',
  currentRecipes: [],
  randomRecipes: [],
  currentRecipe: null,
  recipeName: '',
  spinnerVisible: false,
  showError: false
};

export const getRecipeThunk = createAsyncThunk(
  'recipes/getRecipeData',
  async (
    { mainParamSearch, nextPaginationStep, paginationUrl }: GetRecipesParams,
    thunkAPI
  ) => {
    try {
      const response = await getRecipes({
        mainParamSearch,
        nextPaginationStep,
        paginationUrl,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const getCurrentRecipesThunk = createAsyncThunk(
  'recipes/getCurrentRecipes',
  async (
    { recipeName, nextPaginationStep, paginationUrl }: GetCurrentRecipeParams,
    thunkAPI
  ) => {
    try {
      const response = await getCurrentRecipes({
        recipeName,
        nextPaginationStep,
        paginationUrl,
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
      state.showError = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipeThunk.pending, (state) => {
        state.spinnerVisible = true;
      })
      .addCase(getRecipeThunk.fulfilled, (state, action) => {
        if (state.randomRecipes.length < 21) {
          state.randomRecipes = state.randomRecipes.concat(action.payload.hits);
          return;
        }
        state.recipes = state.recipes.concat(action.payload.hits);
        state.paginationUrl = action.payload._links?.next?.href || '';
        state.spinnerVisible = false
      })
      .addCase(getRecipeThunk.rejected, (state) => {
        state.spinnerVisible = false
      })


      .addCase(getCurrentRecipesThunk.pending, (state) => {
        state.spinnerVisible = true
      })
      .addCase(getCurrentRecipesThunk.fulfilled, (state, action) => {
        if(!action.payload.count){
          state.showError = true
        }
        

        state.recipes = state.recipes.concat(action.payload.hits);
        state.paginationUrl = action.payload._links?.next?.href || '';
        if(state.spinnerVisible){
          state.spinnerVisible = false
        }
      })
      .addCase(getCurrentRecipesThunk.rejected, (state) => {
        state.spinnerVisible = false
        state.showError = true
      })
  },
});

export const {
  recipesData,
  currentCuisines,
  recipesDataReset,
  saveCurrentRecipe,
  saveRecipeName,
  errorReset
} = mainReducer.actions;

export default mainReducer.reducer;
