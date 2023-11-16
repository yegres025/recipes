import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getRecipeThunk,
  currentCuisines,
  recipesDataReset,
  InitialState,
} from '../store/recipe-slice';
import { popularCuisines } from '../utilities/consts/map-data/map-consts';
import { AppDispatch } from '../store';
export default function PopularCuisines() {
  const [selectedCuisine, setSelectCuisine] = useState<string>('');
  const { cuisines } = useSelector(
    (state: { recipes: InitialState }) => state.recipes
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const searchParams = {
    cuisineType: cuisines,
  };

  const handleSubmit = async () => {
    if (selectedCuisine === cuisines) {
      navigate('/recipe-page');
      return;
    }
    dispatch(recipesDataReset());
    await dispatch(getRecipeThunk({ mainParamsSearch: searchParams }));
    navigate('/recipe-page');
  };

  return (
    <form
      className='popular-catigories-container'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <span>Popular cuisines</span>
      <div className='popular-catigories-flex'>
        {popularCuisines.map((item) => (
          <button className='current-category' key={item.id}>
            <img
              onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
                const imageElement = e.target as HTMLImageElement;
                dispatch(currentCuisines(imageElement.alt));
                setSelectCuisine(cuisines);
              }}
              alt={item.name}
              src={item.src}
            />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </form>
  );
}
