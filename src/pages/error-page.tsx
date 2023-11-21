import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { errorReset } from '../store/recipe-slice';
import { useNavigate } from 'react-router-dom';
export default function ErrorPage() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonErrorReset = () => {
    dispatch(errorReset());
    navigate('/');
  };

  return (
    <>
      <div className='error-page'>
        <span>Oooooops🙄 Error 404</span>
        <br />
        <span>Something went wrong</span>
        <br />
        <span>😬😬😬</span>
        <br />
        <img src='src/assets/error-gif.gif' />
        <br />
        <button onClick={handleButtonErrorReset}> Go to Homepage!</button>
      </div>
    </>
  );
}
