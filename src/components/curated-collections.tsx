import { curatedCollections } from '../utilities/consts/map-data/map-consts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import {
  InitialState,
  getRecipeThunk,
  recipesDataReset,
  saveRecipeName,
} from '../store/recipe-slice';
import { useNavigate } from 'react-router-dom';

export default function CuratedCollections() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { paginationUrl } = useSelector(
    (state: { recipes: InitialState }) => state.recipes
  );

  const handleButton = async (name: string) => {
    const curatedCollectionsParams = {
      q: name,
    };

    dispatch(saveRecipeName(name));
    dispatch(recipesDataReset());
    await dispatch(
      getRecipeThunk({
        mainParamsSearch: curatedCollectionsParams, limit: 20
      })
    );
    navigate('/recipe-page');
  };

  return (
    <div className='curated-collections-container'>
      <span className='curated-colliction-header'>Curated Collections</span>
      <div className='curated-collections-grid'>
        {curatedCollections.map((item) => (
          <div className='current-curated-collections' key={item.id}>
            <img className='current-curated-collections-img' src={item.src} />
            <div className='current-curated-collections-info'>
              <span>{item.name}</span>
              <button onClick={() => handleButton(item.name)}>Search!</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
