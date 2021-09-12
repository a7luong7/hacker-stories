import React, { useEffect } from 'react';
import StorySearch from './domain/search';

const SearchedTerms = ({ searchedTerms }) => {
  return null;
  const markup = searchedTerms.map((st, i) => <div key={st}>{st}</div>);
  return markup;
};


function App() {
  return (
    <div className="App">
      <StorySearch />
    </div>
  );
}

export default App;
