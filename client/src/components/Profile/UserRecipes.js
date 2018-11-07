import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import query from "../../queries";
import mutation from "../../mutations";

import Spinner from "../Spinner";

// Delete Recipe Method
const _onDelete = (deleteUserRecipe, recipeID, userID) => async () => {
  // Confirmation Dialog box
  const confirmed = window.confirm(
    "Are you sure, you want to delete this recipe?"
  );

  if (confirmed) {
    const data = await deleteUserRecipe({
      variables: { _id: recipeID },
      update: cache => {
        // get query user recipes cache
        const { userRecipes } = cache.readQuery({
          query: query.recipe.USER_RECIPES,
          variables: { _id: userID }
        });

        // update cache query
        cache.writeQuery({
          query: query.recipe.USER_RECIPES,
          variables: { _id: userID },
          data: {
            userRecipes: userRecipes.filter(recipe => recipe._id !== recipeID)
          }
        });
      },
      // refetch queries / refresh collections
      refetchQueries: () => [
        { query: query.recipe.GET_RECIPES },
        { query: query.user.GET_CURRENT_USER }
      ]
    });

    //console.log(data);
  }
};

const UserRecipes = ({ _id }) => (
  <Fragment>
    <h4>User Recipes</h4>
    <Query query={query.recipe.USER_RECIPES} variables={{ _id }}>
      {({ loading, error, data }) => {
        if (error) console.log("Error: ", error);

        if (loading) return <Spinner />;

        //console.log(data);

        return (
          <Fragment>
            {!data.userRecipes.length && (
              <p>
                You don't have recipes currently,{" "}
                <Link to={"/recipe/add"}>Go Add Some!</Link>
              </p>
            )}

            <ul className="collection">
              {data.userRecipes.map(recipe => (
                <li className="collection-item" key={recipe._id}>
                  <div className="row" style={{ marginBottom: "0px" }}>
                    <div className="col s7">
                      <Link to={`/recipes/${recipe._id}`}>
                        <span className="title">{recipe.name}</span>
                      </Link>
                    </div>
                    <div className="col s3">Likes: {recipe.likes.length}</div>
                    <div className="col s2">
                      <Mutation mutation={mutation.recipe.DELETE_USER_RECIPE}>
                        {(deleteUserRecipe, attrs = {}) => (
                          <a
                            className="secondary-content btn-floating"
                            onClick={_onDelete(
                              deleteUserRecipe,
                              recipe._id,
                              _id
                            )}
                          >
                            <i className="material-icons">delete</i>
                            {attrs.loading ? "deleting..." : ""}
                          </a>
                        )}
                      </Mutation>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fragment>
        );
      }}
    </Query>
  </Fragment>
);

export default UserRecipes;
