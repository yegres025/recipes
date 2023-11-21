import { Link } from "react-router-dom"
import { Recipes } from "../utilities/api/get-data-recipe"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store";
import { saveCurrentRecipe } from "../store/recipe-slice";
interface RecipeListProps {
    recipes: Recipes[],
}

export default function RecipesList ({recipes}: RecipeListProps) {
    const dispatch: AppDispatch = useDispatch()

    const saveRecipe = (id: string) => {
        const recipe = recipes.filter((item) => item.recipe.uri === id);
        dispatch(saveCurrentRecipe(recipe));
      };

    return (
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
    )
} 