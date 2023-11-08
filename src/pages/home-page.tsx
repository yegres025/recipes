import TopSlider from '../components/top-slider';
import PopularCuisines from '../components/popular-cuisines';
import SuperDelicious from '../components/super-delicious';
import CuratedCollections from '../components/curated-collections';
import LatestRecipes from '../components/latest-recipes';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getRecipeThunk, recipesDataReset } from '../store/slice';
import { InitialState } from '../store/slice';

export default function HomePage() {
  
const dispatch: AppDispatch = useDispatch()
const defaultRecipeValue = 'central europe'
const {randomRecipes} = useSelector((state: {mainReducer: InitialState}) => state.mainReducer)

useLayoutEffect(() => {
  dispatch(recipesDataReset())
  dispatch(getRecipeThunk({mainParamSearch: defaultRecipeValue}))
}, [dispatch, randomRecipes.length])

  return (
    <>
      <TopSlider />
      <PopularCuisines />
      <SuperDelicious randomRecipes={randomRecipes}/>
      <CuratedCollections />
      <LatestRecipes />
    </>
  );
}
