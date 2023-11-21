import { FormEvent, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoctailsThunk } from '../store/coctails-slice';
import { AppDispatch } from '../store';
import { defaultRandomAlcoholFreeParams } from '../utilities/consts/api-params.ts/consts';
import SuperDelicious from '../components/super-delicious';
import SearchForm from '../components/searchForm';
import RecipesList from '../components/recipes-list';
import Error from '../components/error';
import {
  InitialStateCoctails,
  saveCocktailName,
  resetFreeAlcohol,
} from '../store/coctails-slice';
import { MutatingDots } from 'react-loader-spinner';

export default function Drinks() {
  const dispatch: AppDispatch = useDispatch();
  const {
    randomAlcoholFreeCocktail,
    name,
    alcoholFreeCocktail,
    spinnerVisible,
    paginationUrl,
    showError
  } = useSelector(
    (state: { coctails: InitialStateCoctails }) => state.coctails
  );

  useLayoutEffect(() => {
    dispatch(
      getCoctailsThunk({
        mainParamsSearch: defaultRandomAlcoholFreeParams,
      })
    );
  }, [dispatch]);

  const paginationParam = {
    paginationUrl,
  };

  const currentRecipeParam = {
    q: name,
    dishType: defaultRandomAlcoholFreeParams.dishType,
    health: defaultRandomAlcoholFreeParams.health,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetFreeAlcohol());
    dispatch(getCoctailsThunk({ mainParamsSearch: currentRecipeParam }));
  };

  const handleClickLoadMore = async () => {
    await dispatch(getCoctailsThunk({ mainParamsSearch: paginationParam }));
  };  

  return (
    <div className='drinks-container'>
      <SuperDelicious randomRecipes={randomAlcoholFreeCocktail} />
      {alcoholFreeCocktail.length !== 0 && (
        <div className='drinks-decoration' />
      )}
      <SearchForm
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => dispatch(saveCocktailName(e.target.value))}
      />
      <RecipesList recipes={alcoholFreeCocktail} />
      {showError ? <Error/> : null}
      <div>
        <input
          onChange={(e) => console.log(e.target.checked)}
          type='checkbox'
          id='alcoholicCheckbox'
        />
        <label htmlFor='alcoholicCheckbox'>Alcoholic</label>
      </div>
      <MutatingDots
        visible={spinnerVisible}
        radius='14.5'
        width='110'
        color='#c3afac'
        secondaryColor='#ac789d'
        wrapperClass='spinner'
      />
      {!spinnerVisible && paginationUrl && (
        <button
          onClick={handleClickLoadMore}
          className='recipe-search-load-more-btn'
        >
          Load More
        </button>
      )}
    </div>
  );
}
