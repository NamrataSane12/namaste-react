import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";

const Body = () => {

    const [listOfRestaurants, setListOfRestaurant] = useState([]);

    const [filteredRestaurant, setfilteredRestaurant] = useState([]);

    const [searchBox, setSearchBox] = useState("");

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.3000395&lng=73.2064994&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    
      const json = await data.json();


      //Optional Chaining
      setListOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setfilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    return listOfRestaurants.length === 0 ? "Loading..." : (
      <div className="body">
        <div className="filter">
          <div className="search">
            <input id="search-text" type="text" value={searchBox} onChange={(e)=>{
             setSearchBox(e.target.value);
            }}/>
            <button className="search-bar" onClick={()=> {

              //Filter the restaurants cards and upddate the UI
              console.log(searchBox);
              const filteredRestaurant = listOfRestaurants.filter((res) => 
                res.info.name.toLowerCase().includes(searchBox.toLowerCase()));
              
                setfilteredRestaurant(filteredRestaurant);
            }}
            
            >Search</button>
          </div>

          <button className="filter-btn" 
          onClick={() => { 
           const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
            );
            setListOfRestaurant(filteredList);
          }}
          > Top Rated Restaurants </button>
        </div>
  
        <div className="res-container">
          {
            filteredRestaurant.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} resData = {restaurant}/> 
            ))
          }
        </div>
      </div>
    )
   };

   export default Body;