import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import query from "../../queries";

import LikeRecipe from "./LikeRecipe";
import Spinner from "../Spinner";

const RecipePage = ({ match }) => (
  <Query query={query.recipe.GET_RECIPE} variables={{ _id: match.params._id }}>
    {({ error, loading, data }) => {
      if (error) console.log("Error: ", error);

      if (loading) return <Spinner />;

      //console.log("Recipe Page: ", data);

      return (
        <Fragment>
          <div
            style={{
              background: `url(${
                data.recipe.imageUrl
              }) center top / cover no-repeat`,
              minHeight: "400px",
              width: "100%",
              position: "relative"
            }}
          />
          <LikeRecipe _id={data.recipe._id} />
          <div className="container">
            <div className="row">
              <div className="col s12">
                <h2>{data.recipe.name}</h2>
                <div>
                  <div className="chip grey">
                    Created by: {data.recipe.user.username}{" "}
                  </div>
                  <div className="chip yellow">{data.recipe.category}</div>
                  <div className="chip teal white-text">
                    Likes: {data.recipe.likes.length}
                  </div>
                </div>

                <p
                  dangerouslySetInnerHTML={{ __html: data.recipe.description }}
                />

                <h3>Instructions</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: data.recipe.instructions }}
                />
              </div>
            </div>
          </div>
        </Fragment>
      );
    }}
  </Query>
);

export default withRouter(RecipePage);
