import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";

import query from "../../queries";
import SearchItem from "./SearchItem";

class Search extends Component {
  state = {
    searchResults: []
  };

  _onChange = client => async event => {
    event.persist();

    const { data } = await client.query({
      query: query.recipe.SEARCH_RECIPES,
      variables: { searchTerm: event.target.value }
    });

    //console.log(data);

    this.setState({
      searchResults: data.searchRecipes
    });
  };
  render() {
    const { searchResults } = this.state;

    return (
      <ApolloConsumer>
        {client => (
          <div className="container">
            <div className="row">
              <div className="col s12 m6 offset-m3">
                <div className="input-field col s12">
                  <input
                    type="text"
                    name="searchTerm"
                    id="search"
                    onChange={this._onChange(client)}
                  />
                  <label htmlFor="search">Search Recipes...</label>
                </div>
                {searchResults.length > 0 && (
                  <ul className="collection">
                    {searchResults.map(recipe => (
                      <SearchItem key={recipe._id} recipe={recipe} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
