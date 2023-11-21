import TopSlider from '../components/top-slider';
import PopularCuisines from '../components/popular-cuisines';
import SuperDelicious from '../components/super-delicious';
import CuratedCollections from '../components/curated-collections';
import LatestRecipes from '../components/latest-recipes';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import {
  getRecipeThunk,
  recipesDataReset,
  errorReset,
} from '../store/recipe-slice';
import { InitialState } from '../store/recipe-slice';
import { defaultRandomRecipeParams } from '../utilities/consts/api-params.ts/consts';

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  dispatch(errorReset());

  const { recipes } = useSelector(
    (state: { recipes: InitialState }) => state.recipes
  );

  useLayoutEffect(() => {
    dispatch(recipesDataReset());
    dispatch(getRecipeThunk({ mainParamsSearch: defaultRandomRecipeParams, limit: 40}));
  }, [dispatch]);

  return (
    <>
      <TopSlider />
      <PopularCuisines />
      <SuperDelicious randomRecipes={recipes} />
      <CuratedCollections />
      <LatestRecipes header='Latest Recipes' recipes={recipes}/>
    </>
  );
}
