import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
 
    const {resData} = props;
  
    const {cloudinaryImageId, name, cuisines, avgRating, sla, costForTwo} = resData?.info;
  
    return (
      <div className="res-card">
        <div className="res-img-box">
        <img alt="res-img" src={CDN_URL + cloudinaryImageId} />
        </div>
        <h3>{name}</h3>
        <p><b>{cuisines.join(", ")}</b></p>
        <p><b>{avgRating} Star</b></p>
        <p><b>{sla?.slaString} </b></p>
        <p><b>{costForTwo}</b></p>
      </div>
    );
  };

  export default RestaurantCard;