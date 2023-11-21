import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { errorReset } from '../store/recipe-slice';
import SearchForm from '../components/searchForm';
import {
  InitialState,
  getRecipeThunk,
  recipesDataReset,
  saveRecipeName,
} from '../store/recipe-slice';
import RecipesList from '../components/recipes-list';
import Error from '../components/error';
import { MutatingDots } from 'react-loader-spinner';
import { FormEvent } from 'react';

export default function RecipesPage() {
  const { recipes, paginationUrl, recipeName, spinnerVisible, showError } =
    useSelector((state: { recipes: InitialState }) => state.recipes);
  const dispatch: AppDispatch = useDispatch();

  const paginationParam = {
    paginationUrl: paginationUrl,
  };

  const currentRecipeParam = {
    q: recipeName,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (showError) {
      dispatch(errorReset());
    }
    dispatch(recipesDataReset());
    await dispatch(getRecipeThunk({ mainParamsSearch: currentRecipeParam }));
  };

  const handleClickLoadMore = async () => {
    await dispatch(getRecipeThunk({ mainParamsSearch: paginationParam }));
  };
  
  return (
    <div className='recipe-search-container'>
      <SearchForm
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => dispatch(saveRecipeName(e.target.value))}
      />
      <RecipesList recipes={recipes} />
      {showError ? <Error /> : null}
      <MutatingDots
        visible={spinnerVisible}
        radius='14.5'
        width='110'
        color='#c3afac'
        secondaryColor='#ac789d'
        wrapperClass='spinner'
      />
      {!spinnerVisible && !showError && paginationUrl && (
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
