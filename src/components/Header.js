import { Link } from "react-router-dom"
import logo from "url:../assets/images/logo.png"

const Title = () => (
    <a href="/">
        <div className="title">
            <img alt="logo" src={logo}></img>
            {/* <h1 id="title" className="title">Appetito</h1> */}
        </div>
    </a>
)


const HeaderComponent = () => {
    return (
        <div className="header">
            {Title()}
            {
                console.log('header rendered')
            }
            <ul className="nav-items">
                <li key="Home">
                    <Link to={'/'}>
                        Home
                    </Link>
                </li>
                <li key="About">
                    <Link to={'/about'}>
                        About
                    </Link>
                </li>
                <li key="Contact">
                    <Link to={'/contact'}>
                        Contact
                    </Link>
                </li>
                <li key="Cart">Cart</li>
            </ul>
        </div>
    )
}

export default HeaderComponent