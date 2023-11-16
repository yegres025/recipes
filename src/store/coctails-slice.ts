import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetRecipesParams,
  getRecipes,
  Recipes,
} from '../utilities/api/get-data-recipe';

export interface InitialStateCoctails {
  alcoholCocktail: Recipes[];
  alcoholFreeCocktail: Recipes[];
  spinnerVisible: boolean;
}

const initialState: InitialStateCoctails = {
  alcoholCocktail: [],
  alcoholFreeCocktail: [],
  spinnerVisible: false,
};

export const getCoctailsThunk = createAsyncThunk(
  'coctails/getCoctailsData',
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

const cocktailsReducer = createSlice({
  name: 'coctails',
  initialState,
  reducers: {
    resetFreeAlcohol(state) {
      state.alcoholFreeCocktail = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoctailsThunk.pending, (state) => {
        state.spinnerVisible = true;
      })
      .addCase(getCoctailsThunk.fulfilled, (state, action) => {
        state.alcoholFreeCocktail = action.payload.hits;
      });
  },
});


export const {resetFreeAlcohol} = cocktailsReducer.actions

export default cocktailsReducer.reducer