import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetRecipesParams,
  getRecipes,
  RecipeData,
  Recipe,
} from '../utilities/api/get-data-recipe';

export interface InitialState {
  recipes: RecipeData[];
  cuisines: string;
  paginationUrl: string;
  currentRecipes: RecipeData | [];
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
  currentRecipe: null,
  recipeName: '',
  spinnerVisible: false,
  showError: false
};

export const getRecipeThunk = createAsyncThunk(
  'recipes/getRecipeData',
  async (
    { mainParamSearch}: GetRecipesParams,
    thunkAPI
  ) => {
    try {
      const response = await getRecipes({
        mainParamSearch,
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
        state.recipes = state.recipes.concat(action.payload.hits);
        state.paginationUrl = action.payload._links?.next?.href || '';
        state.spinnerVisible = false        

        if (action.payload.hits.length === 0){
          state.showError = true
        }
      })
      .addCase(getRecipeThunk.rejected, (state) => {
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
