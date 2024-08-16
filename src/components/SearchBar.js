import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SEARCH_USERS = gql`
  query searchUsers($name: String!) {
    searchUsers(name: $name) {
      id
      username
      email
    }
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_USERS);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchUsers({ variables: { name: searchTerm } });
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {data && (
        <ul>
          {data.searchUsers.map((user) => (
            <li key={user.id}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
