/* eslint-disable linebreak-style */
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import StorySearch from './domain/search';

// const SearchedTerms = ({ searchedTerms }) => {
//   return null;
//   const markup = searchedTerms.map((st, i) => <div key={st}>{st}</div>);
//   return markup;
// };

const App = () => {
  library.add(faSearch);
  return (
    <div className="App">
      <StorySearch />
    </div>
  );
};

export default App;
