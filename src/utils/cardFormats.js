
export function formatRestaurants(data) {
    // Safety check
    if (!data?.data?.cards) return [];

    return data.data.cards
        .map(cardObj => cardObj.card?.card) // flatten
        .filter(card => card?.info) // only restaurants (info exists)
        .map(card => {
            const info = card.info;
            const restoCard = {
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
            return restoCard
        });
}


export function filterRestaurants(searchText, restaurantsList) {
    const filtered = restaurantsList.filter((res) => res.name.toLowerCase().includes(searchText.toLowerCase()));
    return filtered;
}

export function formatMenuData(data) {
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
