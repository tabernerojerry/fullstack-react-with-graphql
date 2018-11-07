import React, { Component } from "react";
import { Mutation } from "react-apollo";

import withSession from "../withSession";
import mutation from "../../mutations";

class LikeRecipe extends Component {
  state = {
    liked: false,
    username: ""
  };

  componentDidMount() {
    if (this.props.authSession.getCurrentUser) {
      const { username, favorites } = this.props.authSession.getCurrentUser;

      // check if recipe ID is includes to favorites
      const isLiked = favorites.map(obj => obj._id).includes(this.props._id);
      //console.log("isLiked: ", isLiked);

      this.setState({
        username,
        liked: isLiked
      });
    }
  }

  _onLikesRecipe = likesRecipe => async () => {
    const data = await likesRecipe({
      variables: {
        recipeID: this.props._id,
        userID: this.props.authSession.getCurrentUser._id
      }
    });

    if (data) {
      await this.props.refetch();
      this.setState({ liked: !this.state.liked });

      //console.log("!liked: ", this.state.liked);
      //console.log("if data likes: ", data);
    }
  };

  render() {
    return (
      this.state.username && (
        <Mutation mutation={mutation.recipe.LIKES_RECIPE}>
          {(likesRecipe, attrs = {}) => (
            <button
              style={{ position: "fixed", bottom: "50px", right: "50px" }}
              className="btn waves-effect waves-light orange"
              onClick={this._onLikesRecipe(likesRecipe)}
            >
              {!this.state.liked ? "Like" : "Dislike"}
            </button>
          )}
        </Mutation>
      )
    );
  }
}

export default withSession(LikeRecipe);
