import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetRecipesParams,
  getRecipes,
  Recipes,
} from '../utilities/api/get-data-recipe';



export interface InitialStateCoctails {
  alcoholFreeCocktail: Recipes[];
  randomAlcoholFreeCocktail: Recipes[];
  name: string
  spinnerVisible: boolean;
  paginationUrl: string;
  showError: boolean
}

const initialState: InitialStateCoctails = {
  alcoholFreeCocktail: [],
  randomAlcoholFreeCocktail: [],
  spinnerVisible: false,
  name: '',
  paginationUrl: '',
  showError: false
};

export const getCoctailsThunk = createAsyncThunk(
  'coctails/getCoctailsData',
  async ({ mainParamsSearch, limit }: GetRecipesParams, thunkAPI) => {
    try {
      const response = await getRecipes({
        mainParamsSearch,
        limit
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
    saveCocktailName(state, action){
      state.name = action.payload
    },
    resetShowError(state){
      state.showError = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoctailsThunk.pending, (state) => {
        state.spinnerVisible = true;
        state.showError = false
      })
      .addCase(getCoctailsThunk.fulfilled, (state, action) => {
        if(state.randomAlcoholFreeCocktail.length < 6 && action.meta.arg.mainParamsSearch.random){
          state.randomAlcoholFreeCocktail = action.payload.hits
        }
        
        if(!action.meta.arg.mainParamsSearch.random){
          state.alcoholFreeCocktail = state.alcoholFreeCocktail.concat(action.payload.hits)
          state.paginationUrl = action.payload._links.next?.href || ''
        }

        if (action.payload.hits.length === 0) {
          state.showError = true;
        }

        state.spinnerVisible = false
      })
      .addCase(getCoctailsThunk.rejected,(state) => {
        state.spinnerVisible = false
        state.showError = true
      })
      
  },
});


export const {resetFreeAlcohol, saveCocktailName} = cocktailsReducer.actions

export default cocktailsReducer.reducer