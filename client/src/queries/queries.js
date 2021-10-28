import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorID: ID!) {
    addBook(
      name: $name,
      genre: $genre,
      authorID: $authorID,
    ) {
      name
      id
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation };