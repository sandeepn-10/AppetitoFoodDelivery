import { urls } from "../constants.js"

const RestaurantCard = ({ name, cuisines, areaName, cloudinaryImageId }) => {
    return (
        <div className="restaurant-card">
            <img alt="name" src={urls.cdn + cloudinaryImageId}></img>
            <h3>{name}</h3>
            <p>{cuisines.join(', ')}</p>
            <p className="stick-bottom">{areaName}</p>
        </div>
    )
}

export default RestaurantCard