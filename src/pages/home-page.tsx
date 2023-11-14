import TopSlider from '../components/top-slider';
import PopularCuisines from '../components/popular-cuisines';
import SuperDelicious from '../components/super-delicious';
import CuratedCollections from '../components/curated-collections';
import LatestRecipes from '../components/latest-recipes';
import { useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getRecipeThunk, recipesDataReset, errorReset } from '../store/slice';
import { InitialState } from '../store/slice';
import {
  defaultRandomRecipeParams,
  defaultRandomAlcoholParams,
  defaultRandomAlcoholFreeParams,
} from '../utilities/consts/api-params.ts/consts';

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  dispatch(errorReset());

  const { recipes } = useSelector(
    (state: { mainReducer: InitialState }) => state.mainReducer
  );

  useLayoutEffect(() => {
    dispatch(recipesDataReset());
    dispatch(getRecipeThunk({ mainParamsSearch: defaultRandomRecipeParams }));
    dispatch(getRecipeThunk({ mainParamsSearch: defaultRandomRecipeParams }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRecipeThunk({ mainParamsSearch: defaultRandomAlcoholFreeParams }));
    dispatch(getRecipeThunk({ mainParamsSearch: defaultRandomAlcoholParams }));
  }, [dispatch]);

  return (
    <>
      <TopSlider />
      <PopularCuisines />
      <SuperDelicious randomRecipes={recipes} />
      <CuratedCollections />
      <LatestRecipes header='Latest Recipes'/>
    </>
  );
}
