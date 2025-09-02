import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { menuImageCDN } from "../constants"
import Shimmers from "./Shimmers"
import { Link } from "react-router-dom"

const RestaurantMenu = () => {
    const { id, name } = useParams()
    const [restaurantMenu, setRestaurantMenu] = useState(null)
    console.log(id)

    function formatData(data) {
        console.log(data)
        const menuList = []
        data
            .map(card => card?.card?.card)
            .filter(item => item?.itemCards)
            .map((item) => {
                menuList.push(...item.itemCards)
            })
        console.log(menuList)
        return menuList
    }

    async function menu(id) {
        const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.7237152&lng=83.3067747&restaurantId=` + id + `&catalog_qa=undefined&query=South%20Indian&submitAction=ENTER`
        const menu = await fetch(url)
        const data = await menu.json()
        const menuList = formatData(data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
        setRestaurantMenu(menuList)
    }

    useEffect(() => {
        menu(id)
    }, [])

    return (
        <div style={{
            paddingLeft: "100px",
        }}>
            <Link to={-1}>Back</Link>
            <h1>
                {name}
            </h1>
            <h3>
                Menu
            </h3>
            <ul>
                {
                    (!restaurantMenu) ? (<Shimmers />) :
                        restaurantMenu?.map((item, i) => {
                            const info = item?.card?.info
                            const imgSrc = menuImageCDN + info?.imageId
                            const rating = +info?.ratings?.aggregatedRating.rating
                            return (
                                <div className="menu-card" key={i}>
                                    <div className="menu-info">
                                        <h3 className="menu-title">{info?.name}</h3>
                                        <p className="menu-desc">{info?.description}</p>
                                        <p className="menu-price">₹{(info?.price || info?.defaultPrice) / 100}</p>
                                        <div className="menu-rating" style={{
                                                color:
                                                    rating >= 4
                                                        ? "green"
                                                        : rating >= 2
                                                            ? "orange"
                                                            : "red",
                                            }}>
                                                {"★".repeat(Math.floor(rating))}
                                                {"☆".repeat(5 - Math.floor(rating))}
                                        </div>
                                    </div>
                                    <img src={imgSrc} alt={info?.name} className="menu-img" />
                                </div>

                            )
                        })
                }
            </ul>
        </div>
    )
}

export default RestaurantMenu