import ErrorPage from './error-page';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, IconButton } from '@mui/material';
import { AppDispatch } from '../store';
import { Link } from 'react-router-dom';
import { saveCurrentRecipe } from '../store/slice';
import {
  InitialState,
  getCurrentRecipesThunk,
  getRecipeThunk,
  recipesDataReset,
  saveRecipeName,
} from '../store/slice';
import { MutatingDots } from 'react-loader-spinner';

export default function RecipePage() {
  const { recipes, paginationUrl, recipeName, cuisines, spinnerVisible, showError } =
    useSelector((state: { mainReducer: InitialState }) => state.mainReducer);
  const dispatch: AppDispatch = useDispatch();
  console.log(showError);
  
  const handleButton = async () => {
    if (recipeName) {
      await dispatch(
        getCurrentRecipesThunk({
          recipeName: recipeName,
          nextPaginationStep: true,
          paginationUrl: paginationUrl,
        })
      );
    }
    await dispatch(
      getRecipeThunk({
        mainParamSearch: cuisines,
        nextPaginationStep: true,
        paginationUrl: paginationUrl,
      })
    );
  };

  const handleSubmit = async () => {
    dispatch(recipesDataReset());
    await dispatch(getCurrentRecipesThunk({ recipeName: recipeName }));
  };

  const saveRecipe = (id: string) => {
    const recipe = recipes.filter((item) => item.recipe.uri === id);
    dispatch(saveCurrentRecipe(recipe));
  };

  if(showError){
    return(
      <ErrorPage />
    )
  }

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
      <div className='recipe-search-grid'>
        {recipes.map((item) => (
          <div className='current-recipe-search' key={item.recipe.uri}>
            <Link
              className='current-recipe-search-link'
              to='/recipe-page/selected-recipe'
            >
              <img
                onClick={() => saveRecipe(item.recipe.uri)}
                src={item.recipe.image}
              />
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
      {!spinnerVisible && <button onClick={handleButton} className='recipe-search-load-more-btn'>
        Load More
      </button>}
    </div>
  );
}
