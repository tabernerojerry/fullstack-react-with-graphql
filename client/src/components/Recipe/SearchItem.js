import React from "react";
import { Link } from "react-router-dom";

const SearchItem = ({ recipe }) => (
  <li className="collection-item">
    <Link to={`/recipes/${recipe._id}`}>
      <span className="title">{recipe.name}</span>
    </Link>
    <a href="#!" className="secondary-content">
      Likes: {recipe.likes.length}
    </a>
  </li>
);

export default SearchItem;
