import RestaurantCard from "./RestaurantCard"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { formatRestaurants,filterRestaurants} from "../utils/cardFormats"
import Shimmers from "./Shimmers"
import { fetchData } from "../utils/callApi"
import {urls} from '../constants'
import useOnline from '../utils/useOnline'

const BodyComponent = () => {

    const online = useOnline()
    if(!online) {
        return (
            <>
                <h1>Check Internet!!!!</h1>
            </>
        )
    }

    const [searchText, setSearchText] = useState("")
    const [restaurantsList, setRestaurantsList] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    console.log('body rendered')

    async function setRestaurants() {
        const restaurants = await fetchData(urls.restaurantsUrl)
        setRestaurantsList(formatRestaurants(restaurants))
        setFilteredRestaurants(formatRestaurants(restaurants))
    }

    useEffect(() => {
        console.log('useEffect')
        setRestaurants()
    }, [])

    return (
        <>
        <div className="center-banner">
          <h1>
            Try <Link className="blinking-element" to={'/quicketo'}>Quicketo</Link> Now!!
          </h1>
        </div>
            <div className="search-bar">
                <input type="text" key="searchText" onChange={(e) => {
                    setSearchText(e.target.value)
                }}></input>
                <button onClick={() => {
                    setFilteredRestaurants(filterRestaurants(searchText, restaurantsList))
                }}>Search</button>
            </div>
            <h3>Best restaurants near you</h3>
            {
                (filteredRestaurants.length === 0) ?
                    (<Shimmers />) :
                    (<div className="restaurant-cards">
                        {
                            filteredRestaurants.map((restaurant) => {
                                return (
                                    <Link key={restaurant.id} to={'/restaurant/' + restaurant.id +'/'+ restaurant.name} >
                                        <RestaurantCard  {...restaurant} />
                                    </Link>
                                )
                            })
                        }
                    </div>
                    )
            }
        </>
    )
}

export default BodyComponent