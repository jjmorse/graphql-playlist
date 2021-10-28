import { graphql } from 'react-apollo';
import { compose } from 'redux';
import React, { Component } from 'react';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorID: ''
    };
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return ( <option disabled>Loading authors...</option>);
    }
    else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{ author.name }</option>
        )
      });
    }
  }

  submitForm (e) {
    var state = this.state;
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: state.name,
        genre: state.genre,
        authorID: state.authorID,
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render () {
    return (    
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={ (e) => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text"  onChange={ (e) => this.setState({ genre: e.target.value })}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={ (e) => this.setState({ authorID: e.target.value })}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button>+</button>

      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);