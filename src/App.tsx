import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import NavBar from './components/nav-bar';
import Bottom from './components/bottom';
import Footer from './components/footer';
function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
      <Bottom />
      <Footer />
    </>
  );
}

export default App;
