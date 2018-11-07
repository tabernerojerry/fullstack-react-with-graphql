import React from "react";
import { Link } from "react-router-dom";
import posed from "react-pose";

// React Pose Animation
const RecipeItem = posed.div({
  show: {
    opacity: 1
  },
  hide: {
    opacity: 0
  }
});

export default ({ _id, name, category, imageUrl }) => (
  <RecipeItem className="col s12 m4">
    <div className="card">
      <div className="card-image">
        <img src={imageUrl} alt={name} />
        <span className="card-title">{category}</span>
      </div>
      <div className="card-action">
        <Link to={`/recipes/${_id}`}>{name}</Link>
      </div>
    </div>
  </RecipeItem>
);
