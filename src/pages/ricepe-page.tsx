import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, IconButton } from '@mui/material';
import { AppDispatch } from '../store';
import { Link } from 'react-router-dom';
import { errorReset, saveCurrentRecipe } from '../store/slice';
import {
  InitialState,
  getRecipeThunk,
  recipesDataReset,
  saveRecipeName,
} from '../store/slice';
import { MutatingDots } from 'react-loader-spinner';

export default function RecipePage() {
  const { recipes, paginationUrl, recipeName, spinnerVisible, showError } =
    useSelector((state: { mainReducer: InitialState }) => state.mainReducer);
  const dispatch: AppDispatch = useDispatch();

  const paginationParam = {
    paginationUrl: paginationUrl,
  };

  const currentRecipeParam = {
    q: recipeName,
  };

  const handleSubmit = async () => {
    if (showError){
      dispatch(errorReset())
    }
    dispatch(recipesDataReset());
    await dispatch(getRecipeThunk({ mainParamSearch: currentRecipeParam }));
  };

  const saveRecipe = (id: string) => {
    const recipe = recipes.filter((item) => item.recipe.uri === id);
    dispatch(saveCurrentRecipe(recipe));
  };

  const handleClickLoadMoreRecipes = async () => {
    await dispatch(getRecipeThunk({ mainParamSearch: paginationParam }));
  };

  return (
    <div className='recipe-search-container'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className='recipe-page-form'
      >
        <TextField
          onChange={(e) => dispatch(saveRecipeName(e.target.value))}
          type='input'
          label='Search recipe'
          variant='standard'
          size='medium'
          color='success'
        />
        <IconButton>
          <ClearIcon color='success' />
        </IconButton>
      </form>
      {showError ? (
        <div className='recipe-search-error'>
          <span>
            Ooooops. <br /> Nothing was found. Enter another recipe
          </span>
          
          <img src='src/assets/error-burak-gif.gif'/>
        </div>
      ) : null}
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
      <MutatingDots
        visible={spinnerVisible}
        radius='14.5'
        width='110'
        color='#c3afac'
        secondaryColor='#ac789d'
        wrapperClass='spinner'
      />
      {!spinnerVisible && !showError && (
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
