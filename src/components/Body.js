import RestaurantCard from "./RestaurantCard"
import { restaurants } from "../constants"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Shimmers from "./Shimmers"

function filterRestaurants(searchText, restaurantsList) {
    const filtered = restaurantsList.filter((res) => res.name.toLowerCase().includes(searchText.toLowerCase()));
    return filtered;
}

function formatRestaurants(data) {
    // Safety check
    if (!data?.data?.cards) return [];

    return data.data.cards
        .map(cardObj => cardObj.card?.card) // flatten
        .filter(card => card?.info) // only restaurants (info exists)
        .map(card => {
            const info = card.info;
            return {
                id: info.id,
                name: info.name,
                cloudinaryImageId: info.cloudinaryImageId,
                locality: info.locality,
                areaName: info.areaName,
                costForTwo: info.costForTwo,
                cuisines: info.cuisines,
                avgRating: info.avgRating,
                parentId: info.parentId,
                avgRatingString: info.avgRatingString,
                totalRatingsString: info.totalRatingsString,
                promoted: info.promoted,
                adTrackingId: info.adTrackingId,
                sla: info.sla,
                availability: info.availability,
                badges: info.badges,
                isOpen: info.isOpen,
                type: info.type,
                aggregatedDiscountInfoV3: info.aggregatedDiscountInfoV3,
                externalRatings: info.externalRatings,
                ratingsDisplayPreference: info.ratingsDisplayPreference,
                campaignId: info.campaignId
            };
        });
}


const BodyComponent = () => {
    const [searchText, setSearchText] = useState("")
    const [restaurantsList, setRestaurantsList] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    console.log('body rendered')

    async function getRestaurants() {
        const rest = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.7237152&lng=83.3067747&collection=83634&tags=layout_CCS&sortBy=&filters=&type=rcv2&offset=0&page_type=null')
        const json = await rest.json()
        setRestaurantsList(formatRestaurants(json))
        setFilteredRestaurants(formatRestaurants(json))
    }

    useEffect(() => {
        console.log('useEffect')
        getRestaurants()
    }, [])

    return (
        <>
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