import { Rating } from '@mui/material';
import { Recipes } from '../utilities/api/get-data-recipe';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { saveCurrentRecipe } from '../store/slice';
import { useNavigate } from 'react-router-dom';

export interface SuperDeliciousProps {
  randomRecipes: Recipes[];
}

export default function SuperDelicious({ randomRecipes }: SuperDeliciousProps) {
  const navigate = useNavigate()
  const recipes = randomRecipes.slice(0, 6);
  const dispatch: AppDispatch = useDispatch();

  const saveRecipe = (id: string) => {
    const recipe = recipes.filter((item) => item.recipe.uri === id);
    dispatch(saveCurrentRecipe(recipe));
    navigate('/recipe-page/selected-recipe')
  };

  return (
    <div className='super-delicious-container'>
      {recipes.map((item) => (
        <div className='current-super-delicious' key={item.recipe.uri}>
          <img onClick={() => saveRecipe(item.recipe.uri)} src={item.recipe.image} />
          <Rating />
          <span>{item.recipe.label}</span>
        </div>
      ))}
    </div>
  );
}
