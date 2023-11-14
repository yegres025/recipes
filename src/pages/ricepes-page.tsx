import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { Link } from 'react-router-dom';
import { errorReset, saveCurrentRecipe } from '../store/slice';
import SearchForm from '../components/searchForm';
import {
  InitialState,
  getRecipeThunk,
  recipesDataReset,
  saveRecipeName,
} from '../store/slice';
import { MutatingDots } from 'react-loader-spinner';
import { FormEvent } from 'react';

export default function RecipesPage() {
  const { recipes, paginationUrl, recipeName, spinnerVisible, showError } =
    useSelector((state: { mainReducer: InitialState }) => state.mainReducer);
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

  const saveRecipe = (id: string) => {
    const recipe = recipes.filter((item) => item.recipe.uri === id);
    dispatch(saveCurrentRecipe(recipe));
  };

  const handleClickLoadMoreRecipes = async () => {
    await dispatch(getRecipeThunk({ mainParamsSearch: paginationParam }));
  };

  return (
    <div className='recipe-search-container'>
      <SearchForm
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => dispatch(saveRecipeName(e.target.value))}
      />
      <div className='recipe-search-grid'>
        {recipes.map((item) => (
          <div className='current-recipe-search' key={item.recipe.uri}>
            <Link
              className='current-recipe-search-link'
              to='/recipe-page/selected-recipe'
            >
              <div>
                <div>
                  <img
                    onClick={() => saveRecipe(item.recipe.uri)}
                    src={item.recipe.image}
                  />
                </div>
              </div>
              <span>{item.recipe.label}</span>
            </Link>
          </div>
        ))}
      </div>
      {showError ? (
        <div className='recipe-search-error'>
          <span>
            Ooooops. <br /> There is nothing . Enter another recipe
          </span>

          <img src='src/assets/error-burak-gif.gif' />
        </div>
      ) : null}
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
          onClick={handleClickLoadMoreRecipes}
          className='recipe-search-load-more-btn'
        >
          Load More
        </button>
      )}
    </div>
  );
}
