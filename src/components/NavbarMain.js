import { Link } from "react-router-dom"

function NavbarMain() {
  return (
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
                <img alt="Profile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKU8YDosyoTjWVSrMGvkVLFbrx2Xyn4qPrg&s"></img>
            </ul>
  )
}

export default NavbarMain