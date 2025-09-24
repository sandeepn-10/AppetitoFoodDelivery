import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { menuImageCDN } from "../constants";
import Shimmers from "./Shimmers";
import { Link } from "react-router-dom";
import urls from "../utils/callUrls";
import { fetchData } from "../utils/callApi";
import { formatMenuData } from "../utils/cardFormats";

const RestaurantMenu = () => {
  const { id, name } = useParams();
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  console.log(id);

  async function menu(id) {
    const data = await fetchData(
      urls.restaurantMenuUrl +
        id +
        `&catalog_qa=undefined&query=South%20Indian&submitAction=ENTER`
    );
    console.log(data);
    const menuList = formatMenuData(
      data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    );
    setRestaurantMenu(menuList);
  }

  useEffect(() => {
    menu(id);
  }, []);

  return (
    <div
      style={{
        paddingLeft: "100px",
      }}
    >
      <Link to={-1}>Back</Link>
      <h1>{name}</h1>
      <h3>Menu</h3>
      <ul>
        {!restaurantMenu ? (
          <Shimmers />
        ) : (
          restaurantMenu?.map((item, i) => {
            const info = item?.card?.info;
            const imgSrc = menuImageCDN + info?.imageId;
            const rating = +info?.ratings?.aggregatedRating.rating;
            return (
              <div className="menu-card" key={i}>
                <div className="menu-info">
                  <h3 className="menu-title">{info?.name}</h3>
                  <p className="menu-desc">{info?.description}</p>
                  <p className="menu-price">
                    ₹{(info?.price || info?.defaultPrice) / 100}
                  </p>
                  <div
                    className="menu-rating"
                    style={{
                      color:
                        rating >= 4 ? "green" : rating >= 2 ? "orange" : "red",
                    }}
                  >
                    {"★".repeat(Math.floor(rating))}
                    {"☆".repeat(5 - Math.floor(rating))}
                  </div>
                </div>
                <img src={imgSrc} alt={info?.name} className="menu-img" />
              </div>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
