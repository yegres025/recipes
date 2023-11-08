import {Link} from 'react-router-dom'

export default function NavBar () {
    return(
        <nav className="nav-container">
            <Link to='/'>
            <button>Homepage</button>
            </Link>
            <Link to='/recipe-page'>
            <button>Recipe Page</button>
            </Link>
            <Link to='/drinks'>
            <button>Drinks</button>
            </Link>
            <button>Calories Page</button>
        </nav>
    )
}