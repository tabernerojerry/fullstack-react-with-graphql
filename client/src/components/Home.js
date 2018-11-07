import React, { Component } from "react";
import { Query } from "react-apollo";
import posed from "react-pose";
import Equalizer from "react-equalizer";

import query from "../queries";
import RecipeItem from "./Recipe/RecipeItem";
import Spinner from "./Spinner";

// React Pose Animation
const RecipeList = posed.div({
  show: {
    x: "0%",
    staggerChildren: 100
  },
  hide: {
    x: "-100%"
  }
});

class App extends Component {
  state = {
    on: false //react pose
  };

  componentDidMount() {
    // react pose
    setTimeout(this.slideIn, 200);
  }

  // react pose
  slideIn = () => this.setState({ on: !this.state.on });

  render() {
    return (
      <Query query={query.recipe.GET_RECIPES}>
        {({ error, loading, data }) => {
          if (error) console.log("Error: ", error);

          if (loading) return <Spinner />;

          if(!data || !data.recipes ) return <p className="center-align">Currently no recipes to display.</p>

          return (
            <div className="container">
              <RecipeList
                className="row"
                pose={this.state.on ? "show" : "hide"}
              >
                <h3 className="center-align">
                  Find Recipes You <strong>Love</strong>
                </h3>
                <Equalizer>
                  {data.recipes.map(recipe => (
                    <RecipeItem key={recipe._id} {...recipe} />
                  ))}
                </Equalizer>
              </RecipeList>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
