import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { saveCurrentRecipe } from '../store/recipe-slice';
import { Link } from 'react-router-dom';
import { Recipes } from '../utilities/api/get-data-recipe';

interface LatestRecipesProps {
  header: string;
  recipes: Recipes[]
}

export default function LatestRecipes({ header, recipes }: LatestRecipesProps) {

  const dispatch: AppDispatch = useDispatch();
  const randomRecipes = recipes.slice(6, 30);
  

  const saveRecipe = (id: string) => {
    const recipe = recipes.filter((item) => item.recipe.uri === id);
    dispatch(saveCurrentRecipe(recipe));
  };

  return (
    <div className='latest-resipes-container'>
      <span className='latest-resipes-header'>{header}</span>
      <div className='latest-resipes-grid'>
        {randomRecipes.map((item) => (
          <div key={item.recipe.uri} className='current-latest-resipes'>
            <Link to='/recipe-page/selected-recipe'>
              <img
                onClick={() => saveRecipe(item.recipe.uri)}
                src={item.recipe.image}
              />
              <span>{item.recipe.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
