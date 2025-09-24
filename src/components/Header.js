import logo from "url:../assets/images/logo.png"
import NavbarMain from "./NavbarMain"

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
            {NavbarMain()}
        </div>
    )
}

export default HeaderComponent