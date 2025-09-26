import { useState, useEffect } from "react";
import  {urls} from "./../constants";
import { formatMenuData } from "./cardFormats";
import { fetchData } from "./callApi";

const useRestaurantMenu = (id) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  console.log(id);
  useEffect(() => {
    menu(id);
  }, []);

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
    console.log(menuList)
    setRestaurantMenu(menuList);
  }

  return restaurantMenu;
};

export default useRestaurantMenu;
