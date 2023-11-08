// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import HomePage from './pages/home-page.tsx';
import RecipePage from './pages/ricepe-page.tsx';
import SelectedRecipe from './pages/selected-recipe.tsx';
import Drinks from './pages/drinks.tsx';
import ErrorPage from './pages/error-page.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
      {
        path: '/recipe-page',
        element: <RecipePage />,
      },
      {
        path: '/recipe-page/selected-recipe',
        element: <SelectedRecipe />,
      },
      {
        path: '/drinks',
        element: <Drinks />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
