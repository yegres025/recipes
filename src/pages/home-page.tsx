import TopSlider from '../components/top-slider';
import PopularCuisines from '../components/popular-cuisines';
import SuperDelicious from '../components/super-delicious';
import CuratedCollections from '../components/curated-collections';
import LatestRecipes from '../components/latest-recipes';
import { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getRecipeThunk, recipesDataReset } from '../store/slice';
import { InitialState } from '../store/slice';

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();

  const defaultRecipeParams = {
    cuisineType: 'central europe',
    random: true,
  };

  const memoizedDefaultRecipeValue = useMemo(
    () => defaultRecipeParams,
    []
  );
  const { recipes } = useSelector(
    (state: { mainReducer: InitialState }) => state.mainReducer
  );

  useLayoutEffect(() => {
    dispatch(recipesDataReset());
    dispatch(getRecipeThunk({ mainParamSearch: memoizedDefaultRecipeValue }));
    dispatch(getRecipeThunk({ mainParamSearch: memoizedDefaultRecipeValue }));
  }, [dispatch, memoizedDefaultRecipeValue]);

  return (
    <>
      <TopSlider />
      <PopularCuisines />
      <SuperDelicious randomRecipes={recipes} />
      <CuratedCollections />
      <LatestRecipes />
    </>
  );
}
