import { useSelector, useDispatch } from 'react-redux';
import { InitialState } from '../store/slice';
import { AppDispatch } from '../store';
import { saveCurrentRecipe } from '../store/slice';
import { Link } from 'react-router-dom';

export default function LatestRecipes() {
  const { randomRecipes } = useSelector(
    (state: { mainReducer: InitialState }) => state.mainReducer
  );
    const dispatch: AppDispatch = useDispatch()
  const recipes = randomRecipes.slice(6, 30);

  const saveRecipe = (id: string) => {
    const recipe = recipes.filter(item => item.recipe.uri === id)
    dispatch(saveCurrentRecipe(recipe))
  }

  return (
    <div className='latest-resipes-container'>
      <span className='latest-resipes-header'>Latest Recipes</span>
      <div className='latest-resipes-grid'>
        {recipes.map((item) => (
          <div key={item.recipe.uri} className='current-latest-resipes'>
            <Link to='/recipe-page/selected-recipe'>
            <img onClick={() => saveRecipe(item.recipe.uri)} src={item.recipe.image} />
            <span>{item.recipe.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
