import React, { Component } from "react";
import { FormSelect } from "materialize-css";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import CKEditor from "react-ckeditor-component";

import mutation from "../../mutations";
import query from "../../queries";
import Error from "../Error";

import withAuth from "../withAuth";

const initialData = {
  name: "",
  category: "",
  description: "",
  instructions: "",
  imageUrl: ""
};

class AddRecipe extends Component {
  state = {
    formData: initialData
  };

  componentDidMount() {
    FormSelect.init(document.querySelector("select"));
    //console.log(this.props);
  }

  _validateForm = () => {
    const {
      formData: { name, category, description, instructions, imageUrl }
    } = this.state;

    const isValid =
      !name || !category || !description || !instructions || !imageUrl;

    return isValid;
  };

  _onChange = ({ target: { name, value } }) =>
    this.setState({ formData: { ...this.state.formData, [name]: value } });

  _onEditorChage = name => event =>
    this.setState({
      formData: { ...this.state.formData, [name]: event.editor.getData() }
    });

  _onSubmit = addRecipe => async event => {
    event.preventDefault();

    const newData = {
      ...this.state.formData,
      user: this.props.authSession.getCurrentUser._id
    };

    const data = await addRecipe({
      variables: { input: newData },
      // Optimistic UI Update to homepage
      update: (cache, { data: { addRecipe } }) => {
        // get query recipes cache
        const { recipes } = cache.readQuery({
          query: query.recipe.GET_RECIPES
        });

        // update query recipes cache
        cache.writeQuery({
          query: query.recipe.GET_RECIPES,
          data: {
            recipes: [addRecipe, ...recipes]
          }
        });
      },
      // refetch queries / refresh collections
      refetchQueries: () => [
        {
          query: query.recipe.USER_RECIPES,
          variables: { _id: this.props.authSession.getCurrentUser._id }
        }
      ]
    });

    if (data) {
      this.setState({ formData: initialData });

      // redirect to homepage
      this.props.history.push("/");
    }
  };

  _renderForm = (addRecipe, { error, loading }) => {
    const { formData } = this.state;

    return (
      <div className="row">
        <form
          className="col s12 m8 offset-m2"
          onSubmit={this._onSubmit(addRecipe)}
        >
          <h1 className="center-align">Recipe Form</h1>
          <div className="input-field col s12">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={this._onChange}
            />
            <label htmlFor="name">Recipe Name</label>
          </div>
          <div className="input-field col s12">
            <input
              type="url"
              name="imageUrl"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={this._onChange}
            />
            <label htmlFor="imageUrl">Recipe Image</label>
          </div>
          <div className="input-field col s12">
            <select
              name="category"
              value={formData.category}
              onChange={this._onChange}
            >
              <option value="" disabled>
                Choose recipe category
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
            </select>
            <label>Category</label>
          </div>
          <div className="col s12">
            {/* <textarea
              className="materialize-textarea"
              name="description"
              id="description"
              value={formData.description}
              onChange={this._onChange}
            /> */}
            <label
              htmlFor="description"
              style={{
                display: "block",
                padding: ".75rem 0",
                fontSize: "1rem"
              }}
            >
              Description
            </label>
            <CKEditor
              content={formData.description}
              events={{
                change: this._onEditorChage("description")
              }}
            />
          </div>
          <div className="col s12">
            {/* <textarea
              className="materialize-textarea"
              name="instructions"
              id="instructions"
              value={formData.instructions}
              onChange={this._onChange}
            /> */}
            <label
              htmlFor="instructions"
              style={{
                display: "block",
                padding: "2rem 0 .75rem",
                fontSize: "1rem"
              }}
            >
              Instructions
            </label>
            <CKEditor
              content={formData.instructions}
              events={{
                change: this._onEditorChage("instructions")
              }}
            />
          </div>
          {error && <Error error={error} />}
          <div className="input-field col s12">
            <button
              className="btn waves-effect waves-light right"
              type="submit"
              disabled={loading || this._validateForm()}
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <Mutation mutation={mutation.recipe.ADD_RECIPE}>
          {this._renderForm}
        </Mutation>
      </div>
    );
  }
}

export default withAuth(
  authSession => authSession && authSession.getCurrentUser
)(withRouter(AddRecipe));
