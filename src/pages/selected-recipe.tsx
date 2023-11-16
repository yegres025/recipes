import { useSelector } from 'react-redux';
import { InitialState } from '../store/recipe-slice';

export default function SelectedRecipe() {
  const { recipes, currentRecipe } = useSelector(
    (state: { recipes: InitialState }) => state.recipes
  );

  console.log(currentRecipe);

  if (currentRecipe) {
    return (
      <div className='selected-recipe-container'>
        <span className='selected-recipe-header'>{currentRecipe.label}</span>
        <img className='selected-recipe-header-img' src={currentRecipe.image} />
        <div className='selected-recipe-micro-info'>
          <span>
            Total weight
            <br />
            {Math.round(currentRecipe.totalWeight)} g
          </span>
          <span>
            Calories
            <br />
            {Math.round(currentRecipe.totalNutrients.ENERC_KCAL.quantity)} kcal
          </span>
          <span>
            Ingredients
            <br />
            {currentRecipe.ingredients.length}
          </span>
        </div>
        <span className='selected-recipe-header-ingredients'>Ingredients</span>

        <div className='selected-recipe-filler'>
          <div className='selected-recipe-filler-ingredients'>
            {currentRecipe.ingredients.map((item) => (
              <span
                className='selected-recipe-filler-current-ingredient'
                key={item.text}
              >
                {item.text}
              </span>
            ))}
            <div className='selected-recipe-instructions'>
              <span className='selected-recipe-instructions-header'>
                Instructions
              </span>
              <span className='selected-recipe-instructions-paragraph'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                sint vel error quidem veritatis eius iusto ab numquam nemo nulla
                earum quaerat repudiandae, quos ea cupiditate illo! Eveniet, hic
                qui.
              </span>
              <span className='selected-recipe-instructions-paragraph'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatibus quis reiciendis cum minus aliquam voluptas eaque
                aspernatur, beatae, optio dolore vero doloribus quaerat dicta
                voluptate! Harum corrupti explicabo tenetur corporis?
              </span>
              <span className='selected-recipe-instructions-paragraph'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Numquam, illo ipsum aliquam eligendi autem deleniti distinctio
                placeat nostrum odio? Magnam esse sapiente rem nam? Vel ipsum
                accusamus laboriosam consequuntur dicta.
              </span>
              <span className='selected-recipe-instructions-paragraph'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
                possimus accusantium explicabo, temporibus pariatur harum eos,
                alias esse, accusamus ut dolore culpa ipsum non sapiente! Odit
                molestias vitae minus magni.
              </span>
              <span className='selected-recipe-instructions-paragraph'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Expedita repellendus molestias, quod excepturi modi quas, at
                praesentium consequuntur eaque sunt officiis minima repellat,
                consequatur mollitia labore maxime aliquid fugit accusantium.
              </span>
            </div>
          </div>

          <div className='selected-recipe-nutrition-right'>
            <div className='selected-recipe-nutrition-facts'>
              <div className='selected-recipe-nutrition-facts-flex'>
                <span>Calories: </span>
                <span>
                  {Math.round(currentRecipe.totalNutrients.ENERC_KCAL.quantity)}
                </span>
              </div>
              <hr />
              <div className='selected-recipe-nutrition-facts-flex'>
                <span>Total Fat: </span>
                <span>
                  {Math.round(currentRecipe.totalNutrients.FAT.quantity)}
                </span>
              </div>
              <hr />
              <div className='selected-recipe-nutrition-facts-flex'>
                <span>Saturated Fat:</span>
                <span>
                  {Math.round(currentRecipe.totalNutrients.FASAT.quantity)}
                </span>
              </div>
              <hr />
              <div className='selected-recipe-nutrition-facts-flex'>
                <span>Cholesterin:</span>
                <span>
                  {Math.round(currentRecipe.totalNutrients.CHOLE.quantity)}
                </span>
              </div>
              <hr />
              <div className='selected-recipe-nutrition-facts-flex'>
                <span>Sodium:</span>
                <span>
                  {Math.round(currentRecipe.totalNutrients.NA.quantity)}
                </span>
              </div>
              <hr />
              <div className='selected-recipe-nutrition-facts-flex'>
                <span>Pottasium:</span>
                <span>
                  {Math.round(currentRecipe.totalNutrients.K.quantity)}
                </span>
              </div>
              <hr />
              <div className='selected-recipe-nutrition-facts-flex'>
                <span>Total Cyrbohydrates:</span>
                <span>
                  {Math.round(currentRecipe.totalNutrients.CHOCDF.quantity)}
                </span>
              </div>
              <hr />
              <div className='selected-recipe-nutrition-facts-flex'>
                <span>Sugars:</span>
                <span>
                  {Math.round(currentRecipe.totalNutrients.SUGAR.quantity)}
                </span>
              </div>
              <hr />
              <div className='selected-recipe-nutrition-facts-flex'>
                <span>Protein:</span>
                <span>
                  {Math.round(currentRecipe.totalNutrients.PROCNT.quantity)}
                </span>
              </div>
            </div>
            <div className='selected-recipe-nutrition-other'>
              <span className='selected-recipe-nutrition-other-header'>
                Other recipes
              </span>
              <div className='selected-recipe-nutrition-other-recipes'>
                {recipes.slice(0, 4).map((item) => (
                  <div
                    className='selected-recipe-nutrition-other-recipes-container'
                    key={item.recipe.uri}
                  >
                    <img
                      className='selected-recipe-nutrition-other-recipes-img'
                      src={item.recipe.image}
                    />
                    <span className='selected-recipe-nutrition-other-recipes-label'>
                      {item.recipe.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
